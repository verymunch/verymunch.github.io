titleChanger = (text, delay) => {
  if (!text) return;

  delay = delay || 2000;

  let counter = 0;

  setInterval(() => {
    if (counter < text.length) document.title = text[counter++];
    else document.title = text[(counter = 0)];
  }, delay);
};

titleChanger(["munchie", "verymunch", "if you can see this i hope you have a lovely day", "free hugs", "what do you call a bear with no teeth?", "a gummy bear ʕ •ᴥ•ʔ", "suh"], 2000);

function thoughts() {
  const element = document.querySelector('#content')
  element.text = 'if you can see this you are awesome :3'

  fetch('https://www.reddit.com/r/Showerthoughts.json?raw_json=1&amp;limit=10')
    .then(res => res.text())
    .then(text => {
      if (!text) {
        element.text = 'what are you using? internet explorer? it didnt let me get reddit posts >:('
        return
      }

      const body = JSON.parse(text)
      const posts = body.data.children.filter(p => !p.data.pinned && !p.data.stickied)
      const post = posts[Math.floor(Math.random() * posts.length)]

      let title = post.data.title.trim()

      if (!title.endsWith('.')) title += '.'

      title = title.toLowerCase()
      title += ' '
      element.textContent = title

      const attr = document.createElement('a')
      attr.setAttribute('href', post.data.url)
      attr.setAttribute('target', '_blank')
      attr.innerText = post.data.author.toLowerCase()
      element.appendChild(attr)
    })
    .catch(e => {
      console.error(e)
      element.textContent = 'something went wrong :('
    })
}