<?php

namespace App\Service;

use App\Entity\Order;
use App\Entity\Product;
use App\Entity\User;
use App\Model\OrderItem;
use App\Model\ShoppingCart;
use App\Model\ShoppingCartItem;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Doctrine\ORM\EntityManagerInterface;

class SessionService
{
    /**
     * Constante pour stocker le panier d'achat dans la session.
     */
    public const SHOPPING_CART = 'shopping_cart';

    private $requireStack;
    private $doctrine;
    public function __construct(RequestStack $requestStack, EntityManagerInterface $doctrine)
    {
        $this->requireStack = $requestStack;
        $this->doctrine = $doctrine;
    }

    /**
     * Renvoie le panier d'achat de la session,
     * S'il n'existe pas, il en crée un nouveau.
     * 
     * @return ShoppingCart
     */
    public function getShoppingCart(): ShoppingCart
    {
        return $this->getSession()->get(self::SHOPPING_CART, new ShoppingCart());
    }

    /**
     * Ajoute un produit au panier.
     * Si le produit existe déjà dans le panier, incrémente sa quantité.
     * 
     * @param Product $product
     */
    public function addItemToShoppingCart(Product $product): void
    {
        $shoppingCart = $this->getShoppingCart();

        $existingShoppingCartItem = $this->getExistingShoppingCartItem($product);

        if ($existingShoppingCartItem) {
            $existingShoppingCartItem->quantity++;
        } else {
            $shoppingCart->items->add(new ShoppingCartItem($product, 1));
        }

        /**
         * Mise à jour du panier d'achat dans la session.
         */
        $this->getSession()->set(self::SHOPPING_CART, $shoppingCart);
    }

    /**
     * Supprime un produit du panier d'achat.
     * Si la quantité du produit est supérieure à 1, la quantité est décrémentée.
     * Si la quantité du produit est égale à 1, l'article est retiré du panier.
     * 
     * @param Product $product
     */
    public function removeItemFromShoppingCart(Product $product): void
    {
        $shoppingCart = $this->getShoppingCart();

        $existingShoppingCartItem = $this->getExistingShoppingCartItem($product);

        if ($existingShoppingCartItem) {
            if ($existingShoppingCartItem->quantity > 1) {
                $existingShoppingCartItem->quantity--;
            } else {
                $shoppingCart->items->removeElement($existingShoppingCartItem);
                $this->reindexShoppingCartItems($shoppingCart); // Réindexe les articles du panier d'achat après leur suppression.
            }
        }

        /**
         * Mise à jour du panier d'achat dans la session.
         */
        $this->getSession()->set(self::SHOPPING_CART, $shoppingCart);
    }

    /**
     * Valide le panier d'achat en le transformant en commande.
     * 
     * @return Order|null
     */
    public function validateShoppingCartAsOrder(SessionInterface $session): ?Order
    {
        $shoppingCart = $this->getShoppingCart($session);
        $userId = $this->getSession()->get('user');

        /**
         * Vérifie si le panier est vide ou si l'utilisateur n'existe pas
         */
        if ($shoppingCart->items->isEmpty() || !$userId ) {
            return null;
        }

        /**
         * Récupère l'utilisateur correspondant à l'identifiant de session
         * depuis la base de données
         * @var User|null $user
         */
        $user = $this->doctrine->getRepository(User::class)->find($userId);

        if (!$user) {
            return null;
        }

        $items = $shoppingCart->items->toArray();
        $total = array_reduce($items, function ($total, $item) {
            return $total + $item->product->price * $item->quantity;
        }, 0);

        if ($total > 0 && $user instanceof User) {
            $order = new Order();
            $order->setTotalPrice($total);
            $order->setUser($user);

            foreach ($items as $item) {
                $order->addProduct($item->product, $item->quantity);
            }

            return $order;
        }

        return null;
    }

    /**
     * Réindexe les articles du panier après la suppression d'un article.
     * 
     * @param ShoppingCart $shoppingCart
     */
    private function reindexShoppingCartItems(ShoppingCart $shoppingCart): void
    {
        $index = 0;
        foreach ($shoppingCart->items as $shoppingCartItem) 
        {
            $shoppingCartItem->setIndex($index);
            $index++;
        }
    }

    /**
     * Recherche un article existant dans le panier d'achat en fonction de l'identifiant du produit.
     * 
     * @param Product $product
     * @return ShoppingCartItem|null
     */
    private function getExistingShoppingCartItem(Product $product)
    {
        $existingShoppingCartItem = $this->getShoppingCart()->items->filter(fn (ShoppingCartItem $item) => $item->product->getId() === $product->getId())->first();

        if (false === $existingShoppingCartItem) {
            return null;
        }

        return $existingShoppingCartItem;
    }

    /**
     * Renvoie la session en cours.
     * 
     * @return SessionInterface
     */
    private function getSession(): SessionInterface
    {
        return $this->requireStack->getSession();
    }
    
}
