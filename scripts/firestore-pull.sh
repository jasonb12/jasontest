
set -e

# Set from env var
# GCLOUD_STORAGE_BUCKET=<project storage bucket>

DEFAULT_STORAGE_BUCKET=<project storage bucket>
STORAGE_BUCKET=${GCLOUD_STORAGE_BUCKET:-$DEFAULT_STORAGE_BUCKET}
echo "Using storage bucket: $STORAGE_BUCKET"

#Remove previous bucket if exists
delete_previous_version_if_exists() {
  #We either delete local folder and bucket object or just a bucket
  rm -r ./firestore-data &&
  gsutil -m rm -r $STORAGE_BUCKET ||
  gsutil -m rm -r $STORAGE_BUCKET
}

export_production_firebase_to_emulator() {
  #Export production firebase to emulator bucket
  gcloud firestore export $STORAGE_BUCKET
  
  #Copy to local folder
  gsutil -m cp -r $STORAGE_BUCKET .
}

#Run bash functions, either delete previous bucket and local folder if exists for update or just export clean way
delete_previous_version_if_exists && export_production_firebase_to_emulator ||
export_production_firebase_to_emulator
