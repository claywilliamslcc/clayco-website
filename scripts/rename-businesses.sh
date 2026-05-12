#!/bin/bash
# =============================================================
# Rename businesses from auto-generated ugly slugs to clean ones,
# updating every post and comment reference in the same pass.
#
# Run once from the project root:
#   bash scripts/rename-businesses.sh
#
# Then review with `git status` and `git diff`, commit, push.
# =============================================================
set -e
cd "$(dirname "$0")/.."

declare -a renames=(
  "map-location-eugene-or-term-spring-2026-founded-2026-04-21-name-golden-goose-getaways-tagline-travel-smarter-spend-wiser-description-golden-goose-getaways-is-the-perfect-travel-planning-app-that-finds-you-the-best-pr|golden-goose-getaways"
  "map-location-eugene-or-term-spring-2026-founded-2026-04-25-name-g-r-e-e-n-neighbor-tagline-non-profit-cooperative-sustainable-and-educational-grocery-and-garden-description-g-r-e-e-n-is-a-cooperative-non-profit-ba|green-neighbor"
  "map-location-eugene-or-term-spring-2026-founded-2026-04-30-name-borderless-en-counter-tagline-connecting-people-one-dish-at-a-time-description-we-provide-an-educational-experience-for-people-getting-ready-to-travel-to|borderless-encounter"
  "map-location-eugene-or-term-spring-2026-founded-2026-05-02-name-mag-matchers-tagline-smart-socks-for-the-intelligent-launderer-description-mag-matchers-is-built-around-a-simple-idea-the-small-frustrations-in-daily-lif|mag-matchers"
  "map-location-eugene-or-term-spring-2026-founded-2026-05-12-name-test-tagline-business-description-my-business-is-good-archived-2026-05-12|test"
)

echo "=== Renaming business files ==="
for pair in "${renames[@]}"; do
  old="${pair%%|*}"
  new="${pair##*|}"
  if [ -f "src/content/businesses/${old}.md" ]; then
    git mv "src/content/businesses/${old}.md" "src/content/businesses/${new}.md"
    echo "  $old"
    echo "    -> $new"
  else
    echo "  (skipped: src/content/businesses/${old}.md not found)"
  fi
done

echo ""
echo "=== Updating references in posts and comments ==="
for pair in "${renames[@]}"; do
  old="${pair%%|*}"
  new="${pair##*|}"
  # macOS sed needs -i ''
  find src/content/posts src/content/comments -name "*.md" -type f \
    -exec sed -i '' "s|business: ${old}|business: ${new}|g" {} \;
done
echo "  Done."

echo ""
echo "=== Result ==="
git status --short
echo ""
echo "Review with: git diff"
echo "When ready:"
echo "  git add -A"
echo "  git commit -m 'Rename businesses to clean slugs'"
echo "  git pull --rebase origin main"
echo "  git push"
