import os
from bs4 import BeautifulSoup, Doctype

def crolling_title(directory):
    titles = []
    
    for root, dir_names, file_names in os.walk(directory):
        for file_name in file_names:
            if file_name.endswith('.htm'):
                name = os.path.join(root, file_name)
                # print('file_name: {}'.format(fname))
                with open(name) as handle:
                    soup = BeautifulSoup(handle.read(), 'html.parser')
                    title = soup.find('title').string
                    titles.append(title)
                    print(title)

                    # for p_tag  in soup.findAll('p'):
                    #     strings = p_tag.get_text()
                    #     print(strings)
                    # for item in soup.contents:
                    #     if isinstance(item, Doctype):
                    #         print('Doctype: {}'.format(item))
                    #         break
    print(len(titles))
    return titles