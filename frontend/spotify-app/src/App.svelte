<script>
  import { onMount } from "svelte";
  const API_URL = `http://127.0.0.1:3001/api/v1`;

  let userData = null;
  let trackData = [];
  let playlistData = [];
  let albumData = [];
  let artistData = [];
  let error = null;
  let loading = true;

  onMount(async () => {
    try {
      const response = await fetch(`${API_URL}/content/me`, {
        method: "GET",
        credentials: "include"
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Server returned ${response.status}: ${text}`);
      }

      userData = await response.json();

      // Fetch more content
      const [tracksRes, playlistsRes, albumsRes, artistsRes] = await Promise.all([
        fetch(`${API_URL}/content/my-tracks`, { credentials: "include" }),
        fetch(`${API_URL}/content/my-playlists`, { credentials: "include" }),
        fetch(`${API_URL}/content/my-albums`, { credentials: "include" }),
        fetch(`${API_URL}/content/my-artists`, { credentials: "include" }),
      ]);

      trackData = await tracksRes.json();
      playlistData = await playlistsRes.json();
      albumData = await albumsRes.json();
      artistData = await artistsRes.json();

    } catch (err) {
      console.error("Error fetching user data:", err);
      error = err.message;
    } finally {
      loading = false;
    }
  });

  const login = () => {
    window.location.href = `${API_URL}/auth/login`;
  };
</script>

<main>
  {#if loading}
    <p>Loading...</p>
  {:else if error}
    <p>Please log in</p>
    <button on:click={login}>Login with Spotify</button>
  {:else if userData}
    <section class="user-info">
      <img src="{userData.images[0]?.url}" alt="{userData.display_name}" />
      <h2>Welcome, {userData.display_name}!</h2>
    </section>

    <div class="grid-container">
      <section class="grid-item">
        <h3>Tracks</h3>
        <ul>
          {#each trackData as track}
            <li>{track.name} - {track.artists.map(a => a.name).join(", ")}</li>
          {/each}
        </ul>
      </section>

      <section class="grid-item">
        <h3>Playlists</h3>
        <ul>
          {#each playlistData as playlist}
            <li>{playlist.name}</li>
          {/each}
        </ul>
      </section>

      <section class="grid-item">
        <h3>Albums</h3>
        <ul>
          {#each albumData as album}
            <li>{album.name} - {album.artists.map(a => a.name).join(", ")}</li>
          {/each}
        </ul>
      </section>

      <section class="grid-item">
        <h3>Artists</h3>
        <ul>
          {#each artistData as artist}
            <li>{artist.name}</li>
          {/each}
        </ul>
      </section>
    </div>
  {/if}
</main>

<style>
  main {
    font-family: Arial, sans-serif;
    padding: 2rem;
  }

  .user-info {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .user-info img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    object-fit: cover;
  }

  .grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1.5rem;
  }

  .grid-item {
    background: #f5f5f5;
    padding: 1rem;
    border-radius: 10px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.1);
    max-height: 400px;
    overflow-y: auto;
  }

  .grid-item h3 {
    margin-top: 0;
    margin-bottom: 0.5rem;
    color: #1db954; /* Spotify green */
  }

  .grid-item ul {
    list-style: none;
    padding: 0;
    margin: 0;
    font-size: 0.9rem;
  }

  .grid-item li {
    margin-bottom: 0.5rem;
  }

  button {
    background-color: #1db954;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    cursor: pointer;
  }

  button:hover {
    background-color: #17a44d;
  }
</style>
