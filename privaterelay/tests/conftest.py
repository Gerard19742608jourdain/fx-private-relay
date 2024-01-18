"""Shared fixtures for privaterelay tests"""

from pathlib import Path
from typing import Iterator

import pytest

from privaterelay.utils import get_version_info


@pytest.fixture
def version_json_path(tmp_path, settings) -> Iterator[Path]:
    """Create testing version.json file, cleanup after test."""
    get_version_info.cache_clear()
    settings.BASE_DIR = tmp_path
    path = settings.BASE_DIR / "version.json"
    yield path
    get_version_info.cache_clear()
