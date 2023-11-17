#!/bin/bash
npm install
npm run build
docker build -t opticsquid/icecreamparlor:0.3 .
