files="$(az storage blob list -c $1 --account-name $2 --query "[].{name:name}" --output tsv --prefix $3)"
for f in $files
 do
   echo "==== Processing $f ===="
   az storage blob update --container-name $1 --name $f --account-name $2 --content-cache "public, max-age=31536000, immutable"
 done
