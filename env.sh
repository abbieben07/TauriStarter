#!/bin/zsh

# Specify the path to your .env file
source .env

echo "KEY $ENV_DEVE_KEY"

# Validate the argument passed to the script
if [[ "$(echo "$1" | tr '[:upper:]' '[:lower:]')" == "decrypt" ]]; then

    echo "Decrypting Development files..."
    npx dotenvenc -d -i .env.development.enc -o .env.development $ENV_DEVE_KEY

    # echo "Decrypting Staging file..."
    # export DOTENVENC_PASS=$ENV_STAG_KEY
    # npx dotenvenc -d -i .env.staging.enc >.env.staging

    # echo "Decrypting Production file..."
    # export DOTENVENC_PASS=$ENV_PROD_KEY
    # npx dotenvenc -d -i .env.production.enc >.env.production

elif [[ "$(echo "$1" | tr '[:upper:]' '[:lower:]')" == "encrypt" ]]; then

    echo "Encrypting Development .env file..."
    npx dotenvenc -e -i .env.development -o .env.development.enc $ENV_DEVE_KEY

    # echo "Encrypting Staging .env file..."
    # export DOTENVENC_PASS=$ENV_STAG_KEY
    # npx dotenvenc -e -i .env.staging -o .env.staging.enc

    # echo "Encrypting Production .env file..."
    # export DOTENVENC_PASS=$ENV_PROD_KEY
    # npx dotenvenc -e -i .env.production -o .env.production.enc

else
    echo "Invalid argument. Please specify 'decrypt' or 'encrypt'."
fi
