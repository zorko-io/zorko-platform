#!/bin/sh

node --experimental-modules --es-module-specifier-resolution=node ./bin/readRepository.mjs './seeds/Vega Lite Examples/Bar Charts & Histograms/' | node --experimental-modules --es-module-specifier-resolution=node ./bin/loadRepository.mjs joe default
