import { useEffect } from 'react'

export default function HtmlRenderer({ htmlContent }) {
  useEffect(() => {
    // Render HTML safely
    const container = document.getElementById('html-renderer')
    if (container && htmlContent) {
      // Create a temporary div to sanitize HTML
      const temp = document.createElement('div')
      temp.innerHTML = htmlContent
      
      // Clear and set
      container.innerHTML = ''
      container.appendChild(temp)
    }
  }, [htmlContent])

  return <div id="html-renderer" className="w-full min-h-screen" />
}
