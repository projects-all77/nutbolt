// src/routes/api/scan.js
export async function POST({ request }) {
    const { url } = await request.json();
    console.log(`Scanning URL: ${url}`);
    // Scan the URL for vulnerabilities
    const results = scanForVulnerabilities(url);

    return new Response(JSON.stringify({ results: results.join("\n") }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
    });
}

  
  // Function to check for basic vulnerabilities
  function scanForVulnerabilities(url) {
    let results = [];
  
    // Existing checks
    // Check for SQL Injection
    if (url.includes("' OR 1=1 --") || url.includes("' UNION SELECT")) {
      results.push("Potential SQL Injection vulnerability detected.");
    }
  
    // Check for XSS (Cross-Site Scripting)
    if (url.includes("<script>") || url.includes("javascript:")) {
      results.push("Potential XSS vulnerability detected.");
    }
  
    // Check for CSRF (Basic heuristic: Check for any non-GET method without a token)
    if (url.includes("post") && !url.includes("csrf-token")) {
      results.push("Potential CSRF vulnerability detected.");
    }
  
    // Additional checks
    // Check for potential Directory Traversal
    if (url.includes("../") || url.includes("..%2F")) {
      results.push("Potential Directory Traversal vulnerability detected.");
    }
  
    // Check for potential Remote File Inclusion (RFI)
    if (url.match(/[?&]file=https?:\/\//i) || url.match(/[?&]path=https?:\/\//i)) {
      results.push("Potential Remote File Inclusion (RFI) vulnerability detected.");
    }
  
    // Check for potential Local File Inclusion (LFI)
    if (url.match(/[?&]file=[\w.-]+/i) || url.match(/[?&]path=[\w.-]+/i)) {
      results.push("Potential Local File Inclusion (LFI) vulnerability detected.");
    }
  
    // Check for potential Command Injection
    if (url.match(/[;&|`]/) || url.includes("$(")) {
      results.push("Potential Command Injection vulnerability detected.");
    }
  
    // Check for potential Open Redirect
    if (url.match(/[?&]url=https?:\/\//i) || url.match(/[?&]redirect=https?:\/\//i)) {
      results.push("Potential Open Redirect vulnerability detected.");
    }
  
    // Check for insecure protocol usage
    if (url.startsWith("http://")) {
      results.push("Insecure protocol (HTTP) detected. Consider using HTTPS.");
    }
  
    // Check for potential SSRF (Server-Side Request Forgery)
    if (url.match(/[?&](url|site|dest)=https?:\/\//i)) {
      results.push("Potential SSRF (Server-Side Request Forgery) vulnerability detected.");
    }
  
    if (results.length === 0) {
      results.push("No obvious vulnerabilities detected.");
    }
  
    return results;
  }
  

  
// This enhanced version includes checks for:

// 1. Directory Traversal
// 2. Remote File Inclusion (RFI)
// 3. Local File Inclusion (LFI)
// 4. Command Injection
// 5. Open Redirect
// 6. Insecure protocol usage (HTTP instead of HTTPS)
// 7. Server-Side Request Forgery (SSRF)

// Please note that these checks are still basic heuristics and may produce false positives or miss some vulnerabilities. A comprehensive security assessment would require more sophisticated tools and techniques. Also, remember that client-side checks like these should not be relied upon for actual security; they're more suitable for educational purposes or as a first line of defense. Real security measures should be implemented server-side.

// http://example.com?q=<script>alert('XSS')</script>
//http://example.com?q=javascript:alert('XSS')
// http://example.com/update-profile
// http://example.com/change-password

// http://example.com?q=https://evil.com/evil.php
// http://example.com?q=https://evil.com/path=../../../etc/passwd
// http://example.com?q=https://evil.com/file=https://evil.com/evil.php
// http://example.com?q=https://evil.com/command=rm -rf /
