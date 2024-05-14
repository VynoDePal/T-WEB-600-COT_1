<?php

namespace App\Controller;

use App\Entity\User;
use Symfony\Component\Security\Http\Attribute\CurrentUser;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class ApiLoginController extends AbstractController
{
    #[Route('/api/login', name: 'api_login', methods: ['POST'])]
    public function index(#[CurrentUser] ?User $user): Response
    {
        // if (null === $user) {
        //     return $this->json([
        //         'message' => 'Invalid credentials',
        //     ], Response::HTTP_UNAUTHORIZED);
        // }

        $token = $this->get('lexik_jwt_authentication.encoder')
            ->encode([
                'email' => $user->getUserIdentifier(),
                'exp' => time() + 3600 * 24, // 24 hours
            ]);
        
        return $this->json([
            'user'  => $user->getId(),
            // 'token' => $token,
        ]);
    }
}
