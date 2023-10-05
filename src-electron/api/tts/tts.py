import sys
import json
import platform


def make_file(command):
    try:
        # set engine properties
        engine.setProperty('rate', int(command["rate"]))
        engine.setProperty('voice', command["voice"])
        # create audio file
        engine.save_to_file(command["message"], command["filename"])
        engine.runAndWait()
        print(json.dumps({"error": None, "filename": command["filename"],
                          "type": "audio/wav", "rate": command["rate"], "voice": command["voice"]}))
        sys.exit(0)
    except Exception as e:
        sys.exit(json.dumps({"error": e, "command": "make_file"}))


def get_info():
    try:
        # get engine properties
        voices = engine.getProperty('voices')
        voice = engine.getProperty('voice')
        rate = engine.getProperty('rate')
        pythonPath = sys.executable
        print(json.dumps({"error": None, "voices": voices, "voice": voice,
              "rate": rate, "pythonPath": pythonPath}, default=lambda x: x.__dict__))

        # end process
        sys.exit(0)
    except Exception as e:
        sys.exit(json.dumps({"error": e, "command": "get_info"}))


if __name__ == "__main__":
    import pyttsx4
    engine = pyttsx4.init()

    args = sys.argv[1]
    kwargs = json.loads(args)
    if kwargs["comm"] == "make_file":
        make_file(kwargs)
    elif kwargs["comm"] == "get_info":
        get_info()
    else:
        sys.exit(json.dumps({"error": "unknown command"}))
