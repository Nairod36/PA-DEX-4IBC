# PA-DEX-4IBC

## Création d'un échange décentralisé

![SchemaDEXpe](https://cdn.discordapp.com/attachments/1177580165925175356/1233374664202391692/IBCSchemaDEX.png?ex=662cdd2a&is=662b8baa&hm=3f12273a9564142d96af10987829ab57bc7cfd91dabbb3a0b3c769435eb408b9&)


## Objectif

Le but principal de ce projet est de construire une dApp (application décentralisée) qui simule une plateforme d'échange décentralisée pour les actifs numériques sur Ethereum. Cette plateforme vise à offrir diverses fonctionnalités à ses utilisateurs et administrateurs, incluant la visualisation et l'échange d'actifs, ainsi que la gestion de liquidités et de staking.

## Fonctionnalités

### Pour les utilisateurs

- **Visualisation des actifs :** Permet aux utilisateurs de voir la liste des actifs disponibles ainsi que leurs détails spécifiques, tels que le prix, le volume, et le nombre de trades.
- **Échange d'actifs :** Offre la possibilité d'échanger des actifs via un mécanisme de token swap.
- **Gestion des Liquidités :** Les utilisateurs peuvent ajouter des actifs dans des Liquidity Pools (LP) pour aider à réguler le prix d'échange.
- **Participation aux Staking Pools :** Permet aux utilisateurs de participer à des Staking Pools pour gagner des récompenses sur leurs actifs.

### Pour les administrateurs

- **Gestion de la plateforme :** Inclut le paramétrage des frais, le bannissement d’utilisateurs, et la donation d'actifs.
- **Dashboard :** Accès à un tableau de bord pour visualiser les statistiques et les performances de la plateforme.


## Dependences

OpenZeppelin Contracts: Utilisé pour les tokens ERC20, les contrôles d'accès et les gardes contre la réentrance.

1. ERC20 (OpenZeppelin)
ERC20 est une norme standard pour la création de jetons interchangeables sur Ethereum, ce qui signifie que ces jetons ont des propriétés et des fonctions identiques, permettant une intégration et une compatibilité uniformes avec l'écosystème de la blockchain. Utiliser la bibliothèque ERC20 d'OpenZeppelin offre plusieurs avantages :

Sécurité renforcée : OpenZeppelin est largement testée et auditée, réduisant le risque d'erreurs ou de failles de sécurité dans la mise en œuvre du token.
Gain de temps : Permet aux développeurs de se concentrer sur les fonctionnalités spécifiques du projet sans réinventer la roue pour les fonctionnalités standard des tokens.
Intercompatibilité : Facilite l'intégration avec des échanges, des portefeuilles et d'autres contrats qui utilisent la norme ERC20.

2. ReentrancyGuard (OpenZeppelin)
ReentrancyGuard est un mécanisme de protection contre les attaques de réentrance, un type de vulnérabilité où des appels externes malveillants peuvent réentrer dans le même contrat avant que le premier appel soit terminé. L'utilisation de ReentrancyGuard offre :

Sécurité accrue : Empêche que des fonctions soient appelées de nouveau avant qu'elles ne soient achevées, bloquant les attaques qui pourraient autrement exploiter des états intermédiaires du contrat.
Facilité d'utilisation : Peut être ajouté à un contrat en utilisant simplement un modificateur sur les fonctions vulnérables, rendant le code plus sûr avec un minimum d'effort.

3. AccessControl (OpenZeppelin)
AccessControl fournit un système flexible et extensible de gestion des rôles pour les contrats Ethereum. Cela permet de contrôler qui peut exécuter certaines actions au sein d'un contrat, offrant plusieurs bénéfices :

Gestion des permissions : Permet de définir, de gérer et d'appliquer des rôles, simplifiant l'administration des droits d'accès dans des systèmes complexes.
Sécurité dynamique : Les rôles peuvent être adaptés en fonction des besoins évolutifs, contrairement à des solutions plus rigides comme l'usage du pattern onlyOwner.
Auditabilité : Chaque rôle est clairement défini et vérifiable, ce qui facilite l'audit et le suivi des interactions de contrat.

4. RainbowKit
RainbowKit n'est pas une bibliothèque Solidity, mais plutôt un kit d'interface utilisateur pour la connexion des portefeuilles Ethereum dans des applications web. Il améliore l'expérience utilisateur en offrant :

Intégration de portefeuille simplifiée : Fournit une interface riche et personnalisable pour la connexion de portefeuilles d'une manière intuitive et visuellement agréable.
Support de plusieurs portefeuilles : Compatible avec une large gamme de portefeuilles Ethereum, ce qui augmente la flexibilité pour les utilisateurs.
Optimisation mobile : Assure une bonne expérience utilisateur sur mobile, un aspect souvent négligé dans les applications blockchain.

## Structure Contrats

AdminManager: Gère les frais de la plateforme et les adresses bannies.

AssetManager: Gestion des actifs avec ajout, mise à jour et récupération des informations d'actifs.

FactoryLiquidityPool: Création de pools de liquidité pour le trading de tokens.

StakingPoolFactory: Création et gestion de pools de staking.

LiquidityPool: Gestion des opérations de pool de liquidité, ajout et retrait de liquidité, ainsi que les échanges de tokens.

StakingPool: Permet aux utilisateurs de staker des tokens, de retirer leurs stakes, et de réclamer des récompenses.  Gère les opérations de staking de manière sécurisée avec des contrôles d'accès basés sur les rôles.


## Déscription des contrats

'AdminManager'
Ce contrat permet au propriétaire de gérer les frais de la plateforme et de contrôler les adresses utilisateurs bannies. Seul le propriétaire peut modifier les frais ou bannir/débannir des adresses.

Fonctions principales
  - setFees(uint256 _fee): Définit les frais de la plateforme.
  - banAddress(address _user): Bannit une adresse.
  - unbanAddress(address _user): Retire le bannissement d'une adresse.
  - grantAsset(address _to, address _token, uint256 _amount): Transfère des actifs gratuitement à une adresse.

'AssetManager'
Gestion des actifs via une liste structurée stockant les détails de chaque actif. Utilise le système de rôles d'OpenZeppelin pour sécuriser l'accès aux fonctions de gestion des actifs.

Fonctions principales
  - addAsset(string memory name, address tokenAddress, uint256 price): Ajoute un nouvel actif.
  - updateAsset(uint256 assetId, uint256 price, uint256 volume, uint256 tradeCount): Met à jour les informations d'un actif.
  - getAsset(uint256 assetId): Récupère les détails d'un actif spécifique

'FactoryLiquidityPool'
Permet la création de pools de liquidité. Chaque pool est identifié de manière unique et peut être retrouvé via son identifiant.

Fonctions principales
  - createLiquidityPool(address _tokenA, address _tokenB, uint256 _amountA, uint256 _amountB):      Crée un nouveau pool de liquidité.
  - getPoolId(address tokenA, address tokenB): Génère et retourne l'identifiant d'un pool à  partir des adresses des tokens.

'StakingPoolFactory'
Crée et stocke les pools de staking. Chaque pool permet aux utilisateurs de staker des tokens pour gagner des récompenses.

Fonctions principales
  - createStakingPool(address _stakingToken, address _rewardsToken, uint256 _totalReward, uint256 _rewardsDuration): Crée un nouveau pool de staking.

'LiquidityPool'
Gère les opérations dans un pool de liquidité, telles que l'ajout et le retrait de liquidité, et les échanges de tokens.

Fonctions principales
  - addLiquidity(...), removeLiquidity(...): Gestion de la liquidité.
  - swap(...): Échange des tokens dans le pool en respectant la formule du produit constant.

'StakingPool'
Permet le staking de tokens, le retrait de ces tokens et la réclamation des récompenses basées sur les tokens stakés.

Fonctions principales
  - stake(uint256 amount), withdraw(uint256 amount): Gestion des stakes.
  - getReward(): Permet aux utilisateurs de réclamer leurs récompenses accumulées.



## Utilisation avec Foundry

Foundry est un outil de test et de déploiement pour les contrats Ethereum. Pour tester ce projet avec Foundry:

  - Remplir les variable d'environnements dans un .env :
    ```
    SEPOLIA_RPC_URL=
    PRIVATE_KEY=
    RAW_PRIVATE_KEY=
    ETHERSCAN_API_KEY=
    FACTORY=
    TKNA=
    TKNB=
    USER_ADDRESS=
    AMOUNT_TO_MINT=
    ```

  - Installez Foundry en suivant la documentation officielle. 
    https://book.getfoundry.sh/getting-started/first-steps
    ( forge install, forge build, fore test)
  - Déployez les contrats via les scripts de déploiement.
  - Utilisez les scripts de test pour valider la logique et les interactions des contrats.


Ce projet offre une structure robuste pour la gestion d'actifs et de liquidités sur la blockchain, avec une flexibilité et une sécurité accrues grâce à l'utilisation des contrats OpenZeppelin et des outils de développement modernes comme Foundry.


# Futur ajout

## Utilisation d'OpenZeppelin Defender

L'intégration d'OpenZeppelin Defender permettra une gestion plus sûre et plus efficace des opérations administratives de la plateforme. Defender offre des outils pour automatiser les transactions et gérer les smart contracts de manière sécurisée. En utilisant Defender, nous pourrons signer des transactions directement via le backend, ce qui renforce la sécurité en centralisant la gestion des clés et en réduisant les risques d'erreurs humaines ou d'attaques externes.

## Renforcement de l'Utilisation de AccessControl

Pour garantir que toutes les interactions avec les smart contracts se fassent via notre DApp et notre backend, nous utiliserons le module AccessControl d'OpenZeppelin. Cela nous permettra de définir des rôles spécifiques qui contrôlent l'accès aux fonctions critiques des contrats, forçant ainsi les utilisateurs à passer par les interfaces approuvées pour interagir avec le système. Cela aide à prévenir les utilisations non autorisées et à garantir que toutes les transactions sont validées et signées correctement via notre backend.

Implémentation de la Signature Obligatoire via le Backend

En plus d'utiliser AccessControl pour gérer l'accès, nous prévoyons d'implémenter un mécanisme où toutes les transactions doivent être signées par notre backend avant d'être exécutées. Cela ajoute une couche supplémentaire de sécurité en s'assurant que même si l'interface utilisateur est compromise, les transactions ne peuvent pas être effectuées sans la signature appropriée du backend.
