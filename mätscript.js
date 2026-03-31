// ==UserScript==
// @name         Exjobb
// @description  Mätscript för laravel och express
// @version      2026-03-28
// @match        http://localhost:3000/*
// @match        http://localhost:8000/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Funktion från stackoverflow
    function jsf32(a, b, c, d) {
        a |= 0; b |= 0; c |= 0; d |= 0;
        var t = a - (b << 23 | b >>> 9) | 0;
        a = b ^ (c << 16 | c >>> 16) | 0;
        b = c + (d << 11 | d >>> 21) | 0;
        b = c + d | 0;
        c = d + t | 0;
        d = a + t | 0;
        return (d >>> 0) / 4294967296;
    }

    Math.random = function() {
        var ran = jsf32(0xF1EA5EED, Math.randSeed+6871, Math.randSeed+1889, Math.randSeed+56781);
        Math.randSeed += Math.floor(ran * 37237);
        return ran;
    }

    Math.setSeed = function(seed) {
        Math.randSeed = seed;
        for (var i = 0; i < 7; i++) Math.random();
    }

    const words = new Array(
        "harry", "agatha", "gilead", "fantasy", "bleach"
    );

    const maxSearches = 100;
    const searchInputId = "searchbar";
    const searchButtonId = "searchBtn";

    let counter = 0;
    let csvData = "word,start,end,delta,matches\n";

    function downloadCSV() {
        const blob = new Blob([csvData], { type: "text/csv" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "measurements.csv";
        document.body.appendChild(a);
        a.click();
    }

    async function runMeasurement() {
        const input = document.getElementById(searchInputId);
        const btn = document.getElementById(searchButtonId);
        if (!input || !btn) return;

        for (counter = 0; counter < maxSearches; counter++) {

            Math.setSeed(counter);
            const word = words[Math.floor(Math.random() * words.length)];

            input.value = word;
            const start = performance.timeOrigin + performance.now();
            btn.click();

            await new Promise(resolve => setTimeout(resolve, 100));

            const end = performance.timeOrigin + performance.now();
            const matches = document.querySelectorAll('#results p').length;
            const delta = end - start;

            csvData += `${word},${start},${end},${delta},${matches}\n`;

            console.log(`Klar! ${counter + 1}: ${word}`);
        }

        downloadCSV();
    }

    window.addEventListener("load", () => {
        setTimeout(runMeasurement, 1000);
    });
})();
