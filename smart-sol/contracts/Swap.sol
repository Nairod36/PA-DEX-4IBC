// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Swap {
    // Frais de swap en pourcentage (ex : 1% = 100)
    uint256 public swapFee = 100; // 1%
    // Événement pour le swap d'actifs
    event TokenSwapped(address indexed user, address fromToken, address toToken, uint256 amount, uint256 receivedAmount);

    // Modifier le taux de swap (pour l'administrateur du contrat)
    function setSwapFee(uint256 _swapFee) public {
        // TODO: Ajouter une vérification de l'administrateur
        swapFee = _swapFee;
    }

    // Fonction pour effectuer un swap de tokens
    function tokenSwap(address fromToken, address toToken, uint256 amount, address user) public {
        require(IERC20(fromToken).transferFrom(user, address(this), amount), "Échec du transfert depuis l'utilisateur");

        // Calcul du montant reçu après application des frais
        uint256 feeAmount = (amount * swapFee) / 10000; // Calcul du montant des frais
        uint256 receivedAmount = amount - feeAmount; // Montant après déduction des frais
        
        // TODO: implémenter une logique pour gérer correctement les taux d'échange entre différents tokens
        // Pour cet exemple, nous allons continuer avec un taux d'échange 1:1

        require(IERC20(toToken).transfer(user, receivedAmount), "Échec du transfert à l'utilisateur");
        emit TokenSwapped(user, fromToken, toToken, amount, receivedAmount);
    }

    // Ajouter d'autres fonctions utiles ici, comme une fonction pour retirer les frais accumulés par le propriétaire du contrat
}
