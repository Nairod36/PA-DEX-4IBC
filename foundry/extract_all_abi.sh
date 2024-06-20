#!/bin/bash

# tr -d '\r' < extract_all_abi.sh > .extract_all_abi.clean && mv .extract_all_abi.clean extract_all_abi.sh
# ./extract_all_abi.sh

# Assurez-vous d'être dans le répertoire de votre projet
cd "$(dirname "$0")"

# Répertoire contenant les contrats
CONTRACTS_DIR="src"

# Répertoire de sortie pour les ABIs
OUTPUT_DIR="../front-dex/src/web3/ABI"
mkdir -p $OUTPUT_DIR

# Boucle sur chaque fichier .sol dans le répertoire des contrats
for CONTRACT_FILE in $CONTRACTS_DIR/*.sol; do
    # Extraction du nom du contrat
    CONTRACT_NAME=$(basename "$CONTRACT_FILE" .sol)

    # Extraction de l'ABI et sauvegarde dans un fichier JSON
    forge inspect $CONTRACT_NAME abi > $OUTPUT_DIR/$CONTRACT_NAME.json

    echo "ABI for $CONTRACT_NAME saved to $OUTPUT_DIR/$CONTRACT_NAME.json"
done
