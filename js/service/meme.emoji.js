const emojis = [
  '🌊',
  '🧽',
  '🍍',
  '🐚',
  '🌴',
  '🐠',
  '🐙',
  '🦀',
  '🦐',
  '🪸',
  '🐡',
  '🦑',
  '🏝️',
  '⚓',
  '🚤',
  '⛵',
  '😂',
  '🍔',
  '🐌',
  '🌅',
  '🦈',
  '🎨',
  '🛶',
  '🎤',
  '📺',
  '🔵',
  '⭐',
]

function geteEmojiScrollerWidth() {
  const emojiScroller = document.querySelector('.emoji-scroller')
  emojiScroller.style.width = window.outerWidth - 128 + 'px'
}
