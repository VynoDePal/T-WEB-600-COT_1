<?php

namespace App\Controller\Authentification;

use App\Entity\User;
use App\Form\UserType;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Nelmio\ApiDocBundle\Annotation\Model;
use OpenApi\Attributes as OA;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;
use Symfony\Component\Serializer\SerializerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

#[Route('/api')]
class AuthController extends AbstractController
{
    private $JWTManager;

    public function __construct(JWTTokenManagerInterface $JWTManager, TokenStorageInterface $tokenStorageInterface, UserPasswordHasherInterface $passwordHasher)
    {
        $this->JWTManager = $JWTManager;
        $this->passwordHasher = $passwordHasher;
        $this->tokenStorageInterface = $tokenStorageInterface;
    }
    /**
     * Enregistre un nouvel utilisateur.
     */
    #[Route('/register', name: 'app_authentification_register', methods: ['GET','POST'])]
    #[OA\Tag(name: 'Users')]
    #[OA\RequestBody(content: new Model(type: UserType::class), required: true)]
    #[OA\Response(response: 200, description: 'Returns the created user')]
    #[OA\Response(response: 201, description: 'Returns the created user')]
    #[OA\Response(response: 400, description: 'Invalid data')]
    public function register(Request $request, UserPasswordHasherInterface $passwordHasher, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $user = new User();
        
        // Vérifier que tous les champs nécessaires sont présents
        if (!isset($data['login'], $data['password'], $data['email'], $data['firstname'], $data['lastname'])) {
            return new JsonResponse(['error' => 'Missing required fields'], Response::HTTP_BAD_REQUEST);
        }

        $user->setLogin($data['login']);
        $user->setPassword($passwordHasher->hashPassword($user, $data['password']));
        $user->setEmail($data['email']);
        $user->setFirstname($data['firstname']);
        $user->setLastname($data['lastname']);

        // $entityManager = $this->getDoctrine()->getManager();
        $entityManager->persist($user);
        $entityManager->flush();

        $responseData = [
            'id' => $user->getId(),
            'login' => $user->getLogin(),
            'email' => $user->getEmail(),
            'firstname' => $user->getFirstname(),
            'lastname' => $user->getLastname(),
        ];

        // Renvoie une réponse JSON avec le nouvel utilisateur créé avec un statut 201 (CREATED)
        return new JsonResponse($responseData, Response::HTTP_CREATED);
    }

    /**
     * Create token with id of user
     *
     * @param int $id
     * @return string
     */
    public function createToken(int $id): string
    {
        $header = [
            'alg' => 'HS256',
            'typ' => 'JWT',
        ];
        $payload = [
            'sub' => $id,
            'iat' => time(),
            'exp' => time() + 86400,
        ];
        $base64Header = base64_encode(json_encode($header));
        $base64Payload = base64_encode(json_encode($payload));
        $signature = hash_hmac('sha256', $base64Header . "." . $base64Payload, 'secretkey', true);
        $base64Signature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));
        return $base64Header . "." . $base64Payload . "." . $base64Signature;
    }

    /**
     * Connexion d'un utilisateur.
     */
    #[Route('/login', name: 'app_authentification_login', methods: ['GET','POST'])]
    #[OA\Tag(name: 'Users')]
    #[OA\Response(response: 200, description: 'Return user login')]
    #[OA\Response(response: 400, description: 'Invalid data')]
    public function login(Request $request, EntityManagerInterface $manager, UserPasswordHasherInterface $passwordHasher, SessionInterface $session): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $user = $manager->getRepository(User::class)->findOneBy(['email' => $data['email']]);

        if (!$user || !$passwordHasher->isPasswordValid($user, $data['password'])) {
            return new JsonResponse(['error' => 'Invalid credentials'], Response::HTTP_BAD_REQUEST);
        }

        $token = $this->createToken($user->getId());

        $session->set('user', $user->getId());
        $session->set('token', $token);

        // $decodedToken = $this->decodeToken($token);

        return new JsonResponse(['token' => $token], Response::HTTP_OK);
    }

    /**
     * Modifie un utilisateur.
     */
    #[Route('/user', name: 'app_authentification_modify_user', methods: ['GET','POST'])]
    #[OA\Tag(name: 'Users')]
    #[OA\Response(response: 200, description: 'Returns the modified user')]
    #[OA\Response(response: 400, description: 'Invalid data')]
    #[OA\RequestBody(content: new Model(type: UserType::class), required: true)]
    public function modifyUser(Request $request, EntityManagerInterface $manager, UserPasswordHasherInterface $passwordHasher, SessionInterface $session): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $id = $session->get('user');
        $user = $manager->getRepository(User::class)->find($id);

        if (!$user) {
            return new JsonResponse(['error' => 'User not found'], Response::HTTP_NOT_FOUND);
        }

        if (isset($data['login'])) {
            $user->setLogin($data['login']);
        }
        if (isset($data['password'])) {
            $user->setPassword($passwordHasher->hashPassword($user, $data['password']));
        }
        if (isset($data['email'])) {
            $user->setEmail($data['email']);
        }
        if (isset($data['firstname'])) {
            $user->setFirstname($data['firstname']);
        }
        if (isset($data['lastname'])) {
            $user->setLastname($data['lastname']);
        }

        $manager->flush();

        $responseData = [
            'id' => $user->getId(),
            'login' => $user->getLogin(),
            'email' => $user->getEmail(),
            'firstname' => $user->getFirstname(),
            'lastname' => $user->getLastname(),
        ];

        return new JsonResponse($responseData, Response::HTTP_OK);
    }

   
    /**
     * Affiche les informations de l'utilisateur connecté.
     */
    #[Route('/api/users', name: 'app_authentification_display_user_informations', methods: ['GET'])]
    #[OA\Tag(name: 'Users')]
    #[OA\Response(response: 200, description: 'Returns the current user informations')]
    public function displayUserInformations(SessionInterface $session, UserRepository $userRepository, SerializerInterface $serializer): Response
    {
        $userId = $session->get('user');
        $user = $userRepository->find($userId);

        $userWithoutPassword = new class {
            public string $id;
            public string $login;
            public string $email;
            public string $firstname;
            public string $lastname;
        };

        $userWithoutPassword->id = $user->getId();
        $userWithoutPassword->login = $user->getLogin();
        $userWithoutPassword->email = $user->getEmail();
        $userWithoutPassword->firstname = $user->getFirstname();
        $userWithoutPassword->lastname = $user->getLastname();

        $responseData = $serializer->normalize($userWithoutPassword);

        return $this->json($responseData, Response::HTTP_OK);
    }


    /**
     * Verify token
     *
     * @param string $token
     * @return User|null
     */
    private function decodeToken(string $token): ?array
    {
        $tokenParts = explode(".", $token);
        $base64Header = $tokenParts[0];
        $base64Payload = $tokenParts[1];
        $base64Signature = $tokenParts[2];

        $header = json_decode(base64_decode(strtr($base64Header, '-_', '+/')), true);
        $payload = json_decode(base64_decode(strtr($base64Payload, '-_', '+/')), true);
        $signature = hash_hmac('sha256', $base64Header . "." . $base64Payload, 'secretkey', true);
        $base64SignatureDecoded = base64_decode(strtr($base64Signature, '-_', '+/'));

        if ($signature !== $base64SignatureDecoded) {
            return null;
        }

        return [
            'header' => $header,
            'payload' => $payload,
        ];
    }




    /**
     * Affiche la page d'accueil.
     */
    #[Route('/home', name: 'home', methods: ['GET'])]
    public function home(): Response
    {
        return $this->render('home/index.html.twig', [
            'controller_name' => 'HomeController',
        ]);
    }

}


