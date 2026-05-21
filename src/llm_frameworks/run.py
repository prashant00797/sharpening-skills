"""Central launcher for the llm_frameworks practice scripts.

Run it from anywhere (it locates the repo root from its own path):

    python src/llm_frameworks/run.py            # interactive menu
    python src/llm_frameworks/run.py parallel    # fuzzy-match a name and run it

It discovers every `main.py` under src/llm_frameworks automatically, so new
exercises appear in the menu with no edits to this file.
"""
import subprocess
import sys
from pathlib import Path

HERE = Path(__file__).resolve()
LLM_DIR = HERE.parent            # src/llm_frameworks
REPO_ROOT = HERE.parents[2]      # repo root (Github-Everyday)

# Make the shared display module importable so the launcher uses the same styling.
sys.path.insert(0, str(LLM_DIR))
from my_Langchain.display import console, rule  # noqa: E402

from rich.table import Table  # noqa: E402


def discover():
    """Find every runnable main.py. Returns a list of (name, category, module_path)."""
    scripts = []
    for main_py in sorted(LLM_DIR.rglob("main.py")):
        if "__pycache__" in main_py.parts:
            continue
        parts = main_py.relative_to(REPO_ROOT).with_suffix("").parts
        # `python -m` needs every path segment to be a valid module name.
        if not all(part.isidentifier() for part in parts):
            console.print(
                f"[yellow]Skipped (folder name not module-safe):[/] "
                f"{main_py.relative_to(REPO_ROOT)}"
            )
            continue
        scripts.append((main_py.parent.name, main_py.parent.parent.name, ".".join(parts)))
    return scripts


def show_menu(scripts):
    """Render the numbered table of available scripts."""
    table = Table(title="llm_frameworks — pick a script to run")
    table.add_column("#", justify="right", style="bold cyan")
    table.add_column("Project", style="white")
    table.add_column("Category", style="dim")
    for i, (name, category, _) in enumerate(scripts, start=1):
        table.add_row(str(i), name, category)
    console.print(table)


def run_script(module_path):
    """Run one script as `python -m <module_path>` from the repo root."""
    rule(f"Running  {module_path}", style="green")
    result = subprocess.run([sys.executable, "-m", module_path], cwd=str(REPO_ROOT))
    if result.returncode == 0:
        rule("Finished", style="green")
    else:
        rule(f"Exited with error (code {result.returncode})", style="red")


def main():
    scripts = discover()
    if not scripts:
        console.print("[red]No main.py scripts found under src/llm_frameworks.[/]")
        return

    # Shortcut: `python run.py <text>` fuzzy-matches the project name.
    if len(sys.argv) > 1:
        query = sys.argv[1].lower()
        matches = [s for s in scripts if query in s[0].lower()]
        if len(matches) == 1:
            run_script(matches[0][2])
            return
        if not matches:
            console.print(f"[red]No script matches '{sys.argv[1]}'.[/] Showing all:")
        else:
            console.print(f"[yellow]Multiple matches for '{sys.argv[1]}':[/]")
            scripts = matches  # narrow the menu to the matches

    # Interactive menu loop.
    while True:
        show_menu(scripts)
        choice = console.input("[bold]Pick a number (q to quit): [/]").strip()
        if choice.lower() in ("q", "quit", "exit", ""):
            console.print("Bye!")
            return
        if not choice.isdigit() or not (1 <= int(choice) <= len(scripts)):
            console.print(f"[red]Enter a number between 1 and {len(scripts)}.[/]")
            continue
        run_script(scripts[int(choice) - 1][2])


if __name__ == "__main__":
    try:
        main()
    except (KeyboardInterrupt, EOFError):
        # Ctrl+C, or stdin closed (e.g. piped input ran out) — quit cleanly.
        console.print("\nBye!")
