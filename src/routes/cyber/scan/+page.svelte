<script>
    let url = "";
    let results = "";
  
    const scanUrl = async () => {
      if (!url) return;
  
      // Send the URL to the backend to scan for vulnerabilities
      const response = await fetch("/api/cyber/scan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });
  
      const data = await response.json();
      results = data.results;
    };
  </script>
  
  <main>
    <h1>Vulnerability Scanner</h1>
  
    <input type="text" bind:value={url} placeholder="Enter URL to scan" />
    <button on:click={scanUrl}>Scan</button>
  
    {#if results}
      <div>
        <h2>Scan Results:</h2>
        <pre>{results}</pre>
      </div>
    {/if}
  </main>
  
  <style>
    input {
      padding: 10px;
      margin-right: 10px;
    }
  
    button {
      padding: 10px;
    }
  
    pre {
      background-color: #f5f5f5;
      padding: 10px;
      border-radius: 5px;
    }
  </style>
  