#!/bin/sh

export PATH="$PWD/.tools/node/bin:$PATH"

echo "Node.js $(node --version) / npm $(npm --version)"
echo "This shell is now configured to use the project's local Node.js."

