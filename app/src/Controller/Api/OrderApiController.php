<?php

namespace App\Controller\Api;

use App\Entity\Order;
use App\Entity\Product;
use App\Entity\User;
use App\Repository\OrderRepository;
use App\Repository\ProductRepository;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use OpenApi\Attributes as OA;
use Doctrine\ORM\EntityManagerInterface;

class OrderApiController extends AbstractController
{
    /**
     * Renvoie les commandes de l'utilisateur actuel
     */
    #[Route('/api/orders', name: 'get_orders_user', methods: ['GET'])]
    #[OA\Tag(name: 'Orders')]
    #[OA\Response(response: 200, description: 'Returns all orders of the current user')]
    #[OA\Response(response: 401, description: 'Unauthorized')]
    #[OA\Response(response: 404, description: 'Not found')]
    public function getOrdersUser(SessionInterface $session, OrderRepository $orderRepository, NormalizerInterface $normalizer): Response
    {
        /**
         * Trouve l'utilisateur actuel en fonction de sa session
         */
        // $userId = $session->get('user');
        // $user = $userRepository->find($userId);

        // $token = $session->get('token');

        // if (!$user || !$token) {
        //     return $this->json([
        //         'error' => 'User not found'
        //     ], 401);
        // }

        /**
         * Recherche toutes les commandes de l'utilisateur actuel
         */
        $orders = $orderRepository->findBy(['user' => $userLogged]);

        $ordersJson = $normalizer->normalize($orders, 'json', ['groups' => ['orders', 'product:read']]);

        return $this->json($ordersJson);
    }


    /**
     * Renvoie une commande de l'utilisateur actuel
     */
    #[Route('/api/orders/{id}', name: 'get_order_user', methods: ['GET'])]
    #[OA\Tag(name: 'Orders')]
    #[OA\Response(response: 200, description: 'Returns an order of the current user')]
    #[OA\Response(response: 401, description: 'Unauthorized')]
    #[OA\Response(response: 404, description: 'Not found')]
    public function getOrderUser(SessionInterface $session, OrderRepository $orderRepository, NormalizerInterface $normalizer, int $id): Response
    {
        $userLogged = $session->get('user');

        /**
         * Recherche la commande correspondant à l'id envoyé en paramètre
         */
        $order = $orderRepository->findOneBy(['id' => $id, 'user' => $userLogged]);

        if (!$order) {
            return $this->json(['message' => 'Order not found'], 404);
        }

        $orderJson = $normalizer->normalize($order, 'json', ['groups' => ['orders', 'product:read']]);

        return $this->json($orderJson);
    }

}
