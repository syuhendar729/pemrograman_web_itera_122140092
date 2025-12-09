import { useBooks } from '../../context/BookContext';
import { useBookStats } from '../../hooks/useBookStats';
import './Stats.css';

/**
 * Halaman Stats - Menampilkan statistik buku
 */
const Stats = () => {
  const { books } = useBooks();
  const stats = useBookStats(books);

  const statsList = [
    {
      label: 'Total Buku',
      value: stats.total,
      icon: '📚',
      color: '#667eea',
    },
    {
      label: 'Milik Saya',
      value: stats.milik,
      icon: '✓',
      color: '#2e7d32',
    },
    {
      label: 'Sedang Dibaca',
      value: stats.baca,
      icon: '📖',
      color: '#e65100',
    },
    {
      label: 'Ingin Dibeli',
      value: stats.beli,
      icon: '🛒',
      color: '#1565c0',
    },
  ];

  return (
    <div className="stats-page">
      <div className="stats-header">
        <h1>Statistik Buku</h1>
        <p>Ringkasan koleksi buku pribadi Anda</p>
      </div>

      <div className="stats-container">
        <div className="stats-grid">
          {statsList.map((stat, index) => (
            <div
              key={index}
              className="stat-card"
              style={{ '--stat-color': stat.color }}
            >
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>

        {books.length > 0 && (
          <div className="stats-details">
            <h2>Rincian Buku</h2>
            <div className="detail-list">
              <div className="detail-item">
                <span className="detail-label">Buku yang Anda Miliki</span>
                <span className="detail-value">{stats.milik}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Buku yang Sedang Dibaca</span>
                <span className="detail-value">{stats.baca}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Buku yang Ingin Dibeli</span>
                <span className="detail-value">{stats.beli}</span>
              </div>
            </div>

            {stats.total > 0 && (
              <div className="progress-section">
                <h3>Distribusi Status</h3>
                <div className="progress-bars">
                  <div className="progress-item">
                    <div className="progress-label">Milik Saya</div>
                    <div className="progress-bar">
                      <div
                        className="progress-fill milik-fill"
                        style={{
                          width: `${(stats.milik / stats.total) * 100}%`,
                        }}
                      ></div>
                    </div>
                    <div className="progress-text">
                      {Math.round((stats.milik / stats.total) * 100)}%
                    </div>
                  </div>

                  <div className="progress-item">
                    <div className="progress-label">Sedang Dibaca</div>
                    <div className="progress-bar">
                      <div
                        className="progress-fill baca-fill"
                        style={{
                          width: `${(stats.baca / stats.total) * 100}%`,
                        }}
                      ></div>
                    </div>
                    <div className="progress-text">
                      {Math.round((stats.baca / stats.total) * 100)}%
                    </div>
                  </div>

                  <div className="progress-item">
                    <div className="progress-label">Ingin Dibeli</div>
                    <div className="progress-bar">
                      <div
                        className="progress-fill beli-fill"
                        style={{
                          width: `${(stats.beli / stats.total) * 100}%`,
                        }}
                      ></div>
                    </div>
                    <div className="progress-text">
                      {Math.round((stats.beli / stats.total) * 100)}%
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {books.length === 0 && (
          <div className="empty-stats">
            <p>Belum ada buku yang ditambahkan. Mulai buat koleksi Anda!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Stats;
