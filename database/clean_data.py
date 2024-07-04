import json
import uuid


def open_json(json_filename: str) -> dict:
    try:
        with open(json_filename) as json_file:
            data = json.load(json_file)
            return data
    except IOError as e:
        print(f"Error reading file {json_filename}: {e}")
        return None


def save_json(data: dict, json_filename: str) -> None:
    try:
        with open(json_filename, "w") as json_file:
            json.dump(data, json_file, indent=4)
            print(f"Saved data to {json_filename}")
    except IOError as e:
        print(f"Error writing to file {json_filename}: {e}")


def main() -> None:
    data = open_json("dist/exercises.json")

    for i in range(len(data)):
        data[i]["image"] = data[i]["images"][0]

        # rename field
        data[i]["primary_muscles"] = data[i]["primaryMuscles"]
        data[i]["secondary_muscles"] = data[i]["secondaryMuscles"]
        data[i]["id"] = str(uuid.uuid4())

        # remove uneeded fields
        data[i].pop("primaryMuscles")
        data[i].pop("secondaryMuscles")
        data[i].pop("images")
        data[i].pop("force")
        data[i].pop("level")
        data[i].pop("mechanic")
        data[i].pop("category")
        data[i].pop("equipment")

    save_json(data, "exercises2.json")


if __name__ == "__main__":
    main()
