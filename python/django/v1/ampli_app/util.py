def get_api_key(env_file, key):
    try:
        with open(env_file, 'r', encoding="utf-8") as f:
            for line in f:
                if line.startswith(key):
                    return line[(len(key) + 1):].strip()
    except Exception:
        pass
    return ''
