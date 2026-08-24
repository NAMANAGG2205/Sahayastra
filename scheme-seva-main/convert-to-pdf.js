const fs = require('fs');
const path = require('path');

// Read the markdown documentation
const markdownContent = fs.readFileSync('./DOCUMENTATION.md', 'utf8');

// Create a simple HTML version with proper styling for PDF
const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Scheme Seva Documentation</title>
    <style>
        @page {
            size: A4;
            margin: 2cm;
        }
        body {
            font-family: 'Times New Roman', serif;
            line-height: 1.6;
            font-size: 11pt;
            color: #333;
        }
        h1 {
            color: #2c3e50;
            border-bottom: 3px solid #3498db;
            padding-bottom: 10px;
            page-break-before: always;
            margin-top: 0;
        }
        h1:first-of-type {
            page-break-before: auto;
        }
        h2 {
            color: #34495e;
            border-bottom: 2px solid #95a5a6;
            padding-bottom: 5px;
            margin-top: 25px;
            page-break-after: avoid;
        }
        h3 {
            color: #7f8c8d;
            margin-top: 20px;
            page-break-after: avoid;
        }
        pre {
            background-color: #f8f9fa;
            padding: 10px;
            border: 1px solid #dee2e6;
            border-radius: 3px;
            font-size: 9pt;
            page-break-inside: avoid;
        }
        code {
            background-color: #f8f9fa;
            padding: 2px 4px;
            border-radius: 2px;
            font-family: 'Courier New', monospace;
            font-size: 10pt;
        }
        pre code {
            background-color: transparent;
            padding: 0;
        }
        ul, ol {
            margin-left: 25px;
        }
        li {
            margin: 5px 0;
        }
        blockquote {
            border-left: 4px solid #3498db;
            padding-left: 15px;
            margin: 15px 0;
            color: #7f8c8d;
            font-style: italic;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 15px 0;
            font-size: 10pt;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }
        th {
            background-color: #3498db;
            color: white;
        }
        .diagram {
            font-family: 'Courier New', monospace;
            font-size: 8pt;
            white-space: pre;
            background-color: #f8f9fa;
            padding: 10px;
            border: 1px solid #dee2e6;
            border-radius: 3px;
            overflow-x: auto;
            page-break-inside: avoid;
        }
        hr {
            border: none;
            border-top: 1px solid #ddd;
            margin: 20px 0;
        }
        p {
            margin: 10px 0;
            text-align: justify;
        }
        .page-break {
            page-break-before: always;
        }
    </style>
</head>
<body>
    ${convertMarkdownToHTML(markdownContent)}
</body>
</html>
`;

function convertMarkdownToHTML(markdown) {
    let html = markdown;
    
    // Convert headers
    html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
    html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
    html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');
    
    // Convert bold and italic
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
    
    // Convert code blocks
    html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>');
    
    // Convert inline code
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
    
    // Convert diagrams (ASCII art) - preserve formatting
    html = html.replace(/```\n([\s\S]*?)```/g, '<div class="diagram">$1</div>');
    
    // Convert horizontal rules
    html = html.replace(/^---$/gm, '<hr>');
    
    // Convert lists (basic)
    html = html.replace(/^- (.+)$/gm, '<li>$1</li>');
    html = html.replace(/^(\d+)\. (.+)$/gm, '<li>$2</li>');
    
    // Wrap list items in ul/ol
    html = html.replace(/(<li>.*<\/li>\n?)+/g, (match) => {
        return '<ul>' + match + '</ul>';
    });
    
    // Convert line breaks to paragraphs
    html = html.replace(/\n\n/g, '</p><p>');
    html = html.replace(/\n/g, '<br>');
    
    // Wrap in paragraphs
    html = '<p>' + html + '</p>';
    
    // Clean up extra paragraph tags around headings and other elements
    html = html.replace(/<p><h([1-6])>/g, '<h$1>');
    html = html.replace(/<\/h([1-6])><\/p>/g, '</h$1>');
    html = html.replace(/<p><\/p>/g, '');
    html = html.replace(/<p><hr><\/p>/g, '<hr>');
    html = html.replace(/<p><pre>/g, '<pre>');
    html = html.replace(/<\/pre><\/p>/g, '</pre>');
    html = html.replace(/<p><div class="diagram">/g, '<div class="diagram">');
    html = html.replace(/<\/div><\/p>/g, '</div>');
    html = html.replace(/<p><ul>/g, '<ul>');
    html = html.replace(/<\/ul><\/p>/g, '</ul>');
    
    return html;
}

// Write HTML file
fs.writeFileSync('./DOCUMENTATION.html', htmlContent);
console.log('✅ HTML file created: DOCUMENTATION.html');
console.log('');
console.log('📄 To convert to PDF:');
console.log('   1. Open DOCUMENTATION.html in your browser');
console.log('   2. Press Ctrl+P (or Cmd+P on Mac)');
console.log('   3. Select "Save as PDF" as the printer');
console.log('   4. Click Save');
console.log('');
console.log('📝 Alternative: Use online converters like:');
console.log('   - https://www.freeconvert.com/html-to-pdf');
console.log('   - https://cloudconvert.com/html-to-pdf');
