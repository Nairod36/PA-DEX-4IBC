# PA-DEX-4IBC

## Création d'un échange décentralisé

![SchemaDEXpe](https://media.discordapp.net/attachments/1030238839136067695/1232995960389505044/IBCSchemaDEX.png?ex=662b7c78&is=662a2af8&hm=24821454e0317c9a8135d771e9bd39b4b4873c5e95731667dd80266f86661d0d&)


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

## Structure Contrats

AdminManager: Gère les frais de la plateforme et les adresses bannies.
AssetManager: Gestion des actifs avec ajout, mise à jour et récupération des informations d'actifs.
FactoryLiquidityPool: Création de pools de liquidité pour le trading de tokens.
StakingPoolFactory: Création et gestion de pools de staking.
LiquidityPool: Gestion des opérations de pool de liquidité, ajout et retrait de liquidité, ainsi que les échanges de tokens.
StakingPool: Permet aux utilisateurs de staker des tokens, de retirer leurs stakes, et de réclamer des récompenses.


## Déscription des contrats

'AdminManager'
Ce contrat permet au propriétaire de gérer les frais de la plateforme et de contrôler les adresses utilisateurs bannies. Seul le propriétaire peut modifier les frais ou bannir/débannir des adresses.

Fonctions principales
  - setFees(uint256 _fee): Définit les frais de la plateforme.
  - banAddress(address _user): Bannit une adresse.
  - unbanAddress(address _user): Retire le bannissement d'une adresse.
  - grantAsset(address _to, address _token, uint256 _amount): Transfère des actifs gratuitement     à une adresse.

'AssetManager'
Gestion des actifs via une liste structurée stockant les détails de chaque actif. Utilise le système de rôles d'OpenZeppelin pour sécuriser l'accès aux fonctions de gestion des actifs.

Fonctions principales
  - addAsset(string memory name, address tokenAddress, uint256 price): Ajoute un nouvel actif.
  - updateAsset(uint256 assetId, uint256 price, uint256 volume, uint256 tradeCount): Met à jour     les informations d'un actif.
  - getAsset(uint256 assetId): Récupère les détails d'un actif spécifique

'FactoryLiquidityPool'
Permet la création de pools de liquidité. Chaque pool est identifié de manière unique et peut être retrouvé via son identifiant.

Fonctions principales
  - createLiquidityPool(address _tokenA, address _tokenB, uint256 _amountA, uint256 _amountB):      Crée un nouveau pool de liquidité.
  - getPoolId(address tokenA, address tokenB): Génère et retourne l'identifiant d'un pool à         partir des adresses des tokens.

'StakingPoolFactory'
Crée et stocke les pools de staking. Chaque pool permet aux utilisateurs de staker des tokens pour gagner des récompenses.

Fonctions principales
  - createStakingPool(address _stakingToken, address _rewardsToken, uint256 _totalReward,           uint256 _rewardsDuration): Crée un nouveau pool de staking.

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
