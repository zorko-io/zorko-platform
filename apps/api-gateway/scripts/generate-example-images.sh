#!/usr/bin/env bash
# requires https://www.gnu.org/software/parallel/

set -e

#mkdir -p public/images/examples/vl
#mkdir -p public/images/examples/vg

pushd seeds

echo "Generating SVGs for Vega-Lite..."
ls specs/vega-lite/*.vl.json | parallel --halt 1 "../node_modules/.bin/vg2svg -b file:///projects/zorko-io/archive/zorko-prototype-2/packages/zorko-api-server/seeds/  {} | ../node_modules/.bin/vg2svg > previews/vega/{/.}.svg"

echo "Generating SVGs for Vega..."
ls specs/vega/*.vg.json | parallel --halt 1 "../node_modules/.bin/vg2svg -b file:///projects/zorko-io/archive/zorko-prototype-2/packages/zorko-api-server/seeds/ {} > previews/vega-lite/{/.}.svg"

#if hash image_optim 2>/dev/null; then
#    echo "Compressing images..."
#    image_optim -r images --allow-lossy --skip-missing-workers
#else
#    echo "Need image_optim to compress images."
#fi

popd
