from pathlib import Path
import shutil

from jinja2 import Environment, FileSystemLoader, select_autoescape


ROOT = Path(__file__).resolve().parents[1]
TEMPLATE_DIR = ROOT / "app" / "templates"
STATIC_DIR = ROOT / "app" / "static"
OUTPUT_DIR = ROOT / "dist"


def build() -> None:
    if OUTPUT_DIR.exists():
        shutil.rmtree(OUTPUT_DIR)

    OUTPUT_DIR.mkdir(parents=True)
    environment = Environment(
        loader=FileSystemLoader(TEMPLATE_DIR),
        autoescape=select_autoescape(("html", "xml")),
    )

    page = environment.get_template("index.html")
    (OUTPUT_DIR / "index.html").write_text(
        page.render(),
        encoding="utf-8",
    )
    shutil.copytree(STATIC_DIR, OUTPUT_DIR / "static")
    (OUTPUT_DIR / ".nojekyll").touch()


if __name__ == "__main__":
    build()
    print(f"Built static site in {OUTPUT_DIR}")
