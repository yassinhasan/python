import youtube_dl,json,os

def extract_format(format_data):

    return {
        'format' : format_data['format'],
        "ext" : format_data['ext'],
        'url' : format_data['url'],

    }
def extract_video_info(url): 
    command = f'youtube-dl "{url}" -j'
    video_data =  json.loads(os.popen(command).read())
    title = video_data['title']
    thumbnail = video_data['thumbnail']
    all_formates = video_data['formats']
    ext_data = [ extract_format(format) for format in all_formates]
    return {
        "title" : title,
        "thumbnail" : thumbnail,
        "formates" : ext_data

    }

