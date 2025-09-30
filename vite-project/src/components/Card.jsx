function Card({ title, action, children, className = '' }) {
  return (
    <section className={`card p-4 sm:p-5 ${className}`}>
      {(title || action) && (
        <div className="mb-3 flex items-center gap-3">
          {title && (
            <h2 className="text-lg font-semibold tracking-wide">
              <span className="accent-gold">|</span> {title}
            </h2>
          )}
          <div className="ml-auto">{action}</div>
        </div>
      )}
      <div className="text-sm sm:text-base leading-6">{children}</div>
    </section>
  )
}

export default Card


