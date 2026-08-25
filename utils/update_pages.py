from bs4 import BeautifulSoup
import frontmatter
import markdown
import os


MARKDOWN_PATH = "./media/markdowns/"

def main():
    # Generate every blog post
    with open("./media/templates/_blog_page_template.html", "r", encoding="utf-8") as file:
        page_template = BeautifulSoup(file, "lxml")

    markdown_file_names = [f for f in os.listdir(MARKDOWN_PATH) if os.path.isfile(os.path.join(MARKDOWN_PATH, f))]

    meta_mds = []

    for markdown_name in markdown_file_names:
        with open(os.path.join(MARKDOWN_PATH, markdown_name), "r", encoding="utf-8") as file:
            md = frontmatter.load(file)

        if md["draft"]:
            continue

        meta_mds.append({
            "title": md["title"],
            "file_name": markdown_name,
            "date": md["date"],
            "reading": md["reading"],
            "draft": md["draft"]
        })

        page_template.title.string = md["title"]
        page_template.find(id="title").string = md["title"]

        reading = page_template.new_tag("i")
        reading.string = f"({md['reading']})"

        page_template.find(id="date").string = md["date"] + " "
        page_template.find(id="date").append(reading)

        html_md = BeautifulSoup(markdown.markdown(md.content), "lxml")
        html_md.prettify()

        page_template.find(id="post-content").clear()
        page_template.find(id="post-content").append(html_md)
        page_template.prettify()

        with open(f"./blogs/{markdown_name.rstrip('.md')}.html", "w", encoding="utf-8") as file:
            file.write(str(page_template))


    with open("./index.html", "r", encoding="utf-8") as file:
        soup = BeautifulSoup(file, "lxml") # lxml

    blog_list = soup.find(id="blog-list")

    blog_list.clear()

    for meta in meta_mds:
        link = soup.new_tag("a")
        link["href"] = f"blogs/{meta['file_name'].rstrip('.md')}.html"
        link.string = meta["title"]

        reading = soup.new_tag("i")
        reading.string = f"({meta['reading']})"

        paragraph = soup.new_tag("p")
        paragraph.string = f"{meta['date']}"
        paragraph.append(reading)
        paragraph.append(link)
        blog_list.append(paragraph)

    pretty_html = soup.prettify()

    with open("./index.html", "w", encoding="utf-8") as file:
        file.write(str(pretty_html))

if __name__ == "__main__":
    main()