#!/usr/bin/env bash
node . > services.json
services-deps -i output/service-dot.png --stdin < services.json
services-deps -i output/service-neato.png -l neato --stdin < services.json
services-deps -i output/service-fdp.png l fdp --stdin < services.json
services-deps -i output/service-sfpd.png l sfdp --stdin < services.json
services-deps -i output/service-twopi.png l twopi --stdin < services.json
services-deps -i output/service-circo.png l circo --stdin < services.json
services-deps --orphans -s -c --stdin < services.json
