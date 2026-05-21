"""Shared rich console helpers for LangChain practice scripts.

Import these instead of re-creating a `Console` in every exercise:

    from ...display import panel, columns, rule, show

`console` is also exported for anything the helpers don't cover.
"""
from rich.console import Console
from rich.panel import Panel
from rich.columns import Columns
from rich.rule import Rule

# The single shared console used by every helper below.
console = Console()


def panel(text, title=None, style="cyan"):
    """Print `text` inside a styled bordered panel."""
    head = f"[bold {style}]{title}[/]" if title else None
    console.print(Panel(str(text), title=head, border_style=style))


def columns(items, equal=True):
    """Print panels side-by-side. `items` is a list of (text, title, style)."""
    panels = [
        Panel(str(text), title=f"[bold {style}]{title}[/]", border_style=style)
        for text, title, style in items
    ]
    console.print(Columns(panels, equal=equal))


def rule(title, style="cyan"):
    """Print a titled horizontal divider."""
    console.print(Rule(f"[bold {style}]{title}[/]", style=style))


def show(*args, **kwargs):
    """Pass-through to `console.print` for anything the helpers don't cover."""
    console.print(*args, **kwargs)
