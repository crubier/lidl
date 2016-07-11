#!/usr/bin/env bash

pandoc index.md --to=html --output index.html --mathjax=http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML --standalone  --highlight-style=pygments --template=template.html --table-of-contents --toc-depth=4 --bibliography=bibliography.bib --filter pandoc-citeproc

pandoc index.md --to=latex --highlight-style=pygments --template=template.tex --latex-engine=xelatex --table-of-contents --toc-depth=4 --listings --standalone --number-sections --output index.pdf --bibliography=bibliography.bib --filter pandoc-citeproc -V geometry:"top=3cm, bottom=3cm, left=2cm, right=2cm"

pwd
