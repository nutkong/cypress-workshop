#!/bin/bash

REQUIRED_DEPS=("brew" "git" "node" "mongod")

brew_install(){
  # run brew install scripts
  os="$(uname -s)"
  if ${os} == "Darwin*)"
    then
      echo "installing brew"

      if ! loc="$(type -p xcode-select)" || [[-z $loc]];
        then
          xcode-select --install
      fi

      /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
    else
      echo "your os don't need to install homebrew"
      echo "you might use chocolately instead.(https://chocolatey.org/docs/installation)"
  fi
}

git_install(){
  # run brew install scripts
  echo "installing git"
  brew install git
}

node_install(){
  # run brew install scripts
  echo "installing node"
  brew install node

  npm i -g yarn
}

mongod_install(){
  # run brew install scripts
  echo "installing mongodb"

  brew tap mongodb/brew
  brew install mongodb-community
  brew services start mongodb-community
}

for (( i=0; i<${#REQUIRED_DEPS[@]}; i++ ));
  do
    echo "🚗 check if ${REQUIRED_DEPS[i]} is installed"

    if ! loc="$(type -p ${REQUIRED_DEPS[i]})" || [[ -z $loc ]];
      then
        echo "installing ${REQUIRED_DEPS[i]}"
        ${REQUIRED_DEPS[i]}_install
    fi
    INSTALLED_DEPS[i]=true

  for (( j=0; j<${#INSTALLED_DEPS[@]}; j++ ));
    do
      if ${INSTALLED_DEPS[j]}
        then
          echo "✅ ${REQUIRED_DEPS[j]} installed successfully"
        else
          echo "❌ ${REQUIRED_DEPS[j]} didn't install"
      fi
  done;
done;
