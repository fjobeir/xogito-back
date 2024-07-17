#!/bin/bash
TAR_FILE="../devotion-take-home-backend.tar.gz"
FOLDER_TO_TAR="."
tar --exclude="node_modules" --exclude=".next" --exclude=".git" -cvzf $TAR_FILE $FOLDER_TO_TAR
echo "Gzipped into $TAR_FILE"
