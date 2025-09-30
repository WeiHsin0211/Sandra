import './App.css'

function App() {
  return (
    <div className="resume">
      <header className="resume__header">
        <div className="resume__intro">
          <h1 className="resume__name">Sandra Lang</h1>
          <p className="resume__title">Front-End Developer</p>
          <p className="resume__summary">
            熱愛使用 React 打造流暢、易維護的前端體驗，專注於最佳化效能與使用者體驗。
          </p>
        </div>
        <ul className="resume__contacts">
          <li><a href="mailto:sandra@example.com">sandra@example.com</a></li>
          <li><a href="https://www.linkedin.com/in/sandralang" target="_blank" rel="noreferrer">LinkedIn</a></li>
          <li><a href="https://github.com/sandralang" target="_blank" rel="noreferrer">GitHub</a></li>
          <li>Taipei, Taiwan</li>
        </ul>
      </header>

      <nav className="resume__nav">
        <a href="#about">關於我</a>
        <a href="#experience">經歷</a>
        <a href="#projects">作品</a>
        <a href="#skills">技能</a>
        <a href="#education">學歷</a>
        <a href="#contact">聯絡</a>
      </nav>

      <main className="resume__content">
        <section id="about" className="section">
          <h2>關於我</h2>
          <p>
            我擁有 X 年前端經驗，熟悉 React、Vite、TypeScript 與現代前端生態系。擅長將設計轉化為高品質、可擴充的元件與頁面。
          </p>
        </section>

        <section id="experience" className="section">
          <h2>經歷</h2>
          <div className="item">
            <div className="item__head">
              <h3>Front-End Developer · ABC Tech</h3>
              <span>2022 - 現在</span>
            </div>
            <ul>
              <li>建立設計系統元件庫，縮短 30% 開發時間。</li>
              <li>導入程式碼分割與快取策略，首頁載入時間減少 40%。</li>
              <li>與設計與後端協作，交付多個高流量行銷頁面。</li>
            </ul>
          </div>
          <div className="item">
            <div className="item__head">
              <h3>UI Engineer · XYZ Studio</h3>
              <span>2020 - 2022</span>
            </div>
            <ul>
              <li>打造 SPA 產品功能模組，優化表單體驗與驗證流程。</li>
              <li>參與 A/B 測試與事件追蹤，提升轉換率 15%。</li>
            </ul>
          </div>
        </section>

        <section id="projects" className="section">
          <h2>作品</h2>
          <div className="projects">
            <article className="project">
              <h3>個人部落格平台</h3>
              <p>以 React + Vite 開發，支援 Markdown 發佈、標籤分類與全文搜尋。</p>
              <p className="meta">
                技術：React, Vite, TypeScript, Tailwind, Algolia
              </p>
              <p><a href="https://example.com/blog" target="_blank" rel="noreferrer">Live</a> · <a href="https://github.com/sandralang/blog" target="_blank" rel="noreferrer">Repo</a></p>
            </article>
            <article className="project">
              <h3>電商前台重構</h3>
              <p>以元件化思維重構商品頁與購物車，導入虛擬清單提升捲動效能。</p>
              <p className="meta">技術：React, Zustand, React Query</p>
            </article>
          </div>
        </section>

        <section id="skills" className="section">
          <h2>技能</h2>
          <ul className="tags">
            <li>React</li>
            <li>TypeScript</li>
            <li>Vite</li>
            <li>HTML/CSS</li>
            <li>Node.js</li>
            <li>REST/GraphQL</li>
            <li>Testing (Jest/RTL)</li>
            <li>Git/GitHub</li>
          </ul>
        </section>

        <section id="education" className="section">
          <h2>學歷</h2>
          <p>國立範例大學 · 資訊工程學系 · 2016 - 2020</p>
        </section>

        <section id="contact" className="section">
          <h2>聯絡</h2>
          <p>
            歡迎寄信至 <a href="mailto:sandra@example.com">sandra@example.com</a> 或透過 LinkedIn 與我聯繫。
          </p>
        </section>
      </main>

      <footer className="resume__footer">
        <span>© {new Date().getFullYear()} Sandra Lang</span>
      </footer>
    </div>
  )
}

export default App
