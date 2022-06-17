def get_api_key(env_file):
    try:
        with open(env_file, 'r', encoding="utf-8") as f:
            for line in f:
                if line.startswith('API_KEY='):
                    return line[8:].strip()
    except Exception:
        pass
    return ''
