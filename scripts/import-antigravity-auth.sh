#!/bin/bash
mkdir -p plugins/antigravity-auth
git clone https://github.com/yetone/alma-plugins.git temp_repo
cp -r temp_repo/plugins/antigravity-auth/* plugins/antigravity-auth/
rm -rf temp_repo
