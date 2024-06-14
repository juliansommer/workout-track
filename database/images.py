import os
import shutil

# specify the path to your main folder and images folder
main_folder = "exercises"
images_folder = "images"

# create the images folder if it doesn't exist
if not os.path.exists(images_folder):
    os.makedirs(images_folder)

# iterate over all subfolders in the main folder
for subfolder in os.listdir(main_folder):
    subfolder_path = os.path.join(main_folder, subfolder)

    # check if it's actually a folder
    if os.path.isdir(subfolder_path):
        # iterate over all files in the subfolder
        for filename in os.listdir(subfolder_path):
            # check if it's an image file
            if filename.endswith(".jpg"):
                # construct the full file path
                file_path = os.path.join(subfolder_path, filename)
                # construct the new file name
                new_file_name = subfolder + ".jpg"
                new_file_path = os.path.join(images_folder, new_file_name)
                # move and rename the file
                shutil.move(file_path, new_file_path)
