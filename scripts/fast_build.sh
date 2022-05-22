#!/usr/bin/env bash

export PATH=$(realpath ../depot_tools):$PATH

nix-shell -p gn --run "gn gen out/fast-build --args='devtools_skip_typecheck=true'; autoninja -C out/fast-build/"
