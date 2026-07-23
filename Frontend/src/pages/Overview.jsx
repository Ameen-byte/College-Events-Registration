import { useEffect, useState } from 'react'
import Card from '../components/Card.jsx'
import { deleteRegistration, getRegistrations, updateRegistration } from '../api/api.js'
import styles from './Overview.module.css'

export default function Overview() {
  const [registrations, setRegistrations] = useState([])
  const [meta, setMeta] = useState({ total: 0, page: 1, pages: 1 })
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('createdAt')
  const [order, setOrder] = useState('desc')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [actionId, setActionId] = useState('')

  useEffect(() => {
    let active = true
    setLoading(true)
    getRegistrations({ search, page: meta.page, limit: 8, sort, order })
      .then(({ data }) => { if (active) { setRegistrations(data.data); setMeta({ total: data.total, page: data.page, pages: Math.max(data.pages, 1) }) } })
      .catch((requestError) => { if (active) setError(requestError.response?.data?.message || 'Unable to load registrations.') })
      .finally(() => active && setLoading(false))
    return () => { active = false }
  }, [search, sort, order, meta.page])

  const changeSearch = (event) => { setSearch(event.target.value); setMeta((current) => ({ ...current, page: 1 })) }
  const changeSort = (event) => { setSort(event.target.value); setMeta((current) => ({ ...current, page: 1 })) }
  const handleDelete = async (id) => {
    if (!window.confirm('Cancel this registration?')) return
    setActionId(id)
    try { await deleteRegistration(id); setRegistrations((current) => current.filter((item) => item._id !== id)); setMeta((current) => ({ ...current, total: Math.max(current.total - 1, 0) })) } catch (requestError) { setError(requestError.response?.data?.message || 'Unable to cancel registration.') } finally { setActionId('') }
  }
  const handleStatusUpdate = async (id, status) => {
    setActionId(id)
    try { const { data } = await updateRegistration(id, { status }); setRegistrations((current) => current.map((item) => item._id === id ? data.data : item)) } catch (requestError) { setError(requestError.response?.data?.message || 'Unable to update registration.') } finally { setActionId('') }
  }

  return <section className={styles.overviewPage}>
    <header className={styles.pageHeader}><div><p className={styles.eyebrow}>Live MongoDB records</p><h1>Registration overview</h1><p>Review registrations returned by the backend.</p></div></header>
    <div className={styles.metricGrid}><Card title="Total registrations" value={meta.total}><span className={styles.metricHint}>From MongoDB</span></Card><Card title="Current page" value={registrations.length}><span className={styles.metricHint}>Loaded records</span></Card><Card title="Paid" value={registrations.filter((item) => item.paymentStatus === 'paid').length}><span className={styles.metricHint}>On this page</span></Card></div>
    <div className={styles.toolbar}><input type="search" value={search} onChange={changeSearch} placeholder="Search name, email, college..." /><select value={sort} onChange={changeSort}><option value="createdAt">Newest</option><option value="fullName">Name</option><option value="paymentAmount">Amount</option><option value="status">Status</option></select><button type="button" onClick={() => setOrder((current) => current === 'asc' ? 'desc' : 'asc')}>Order: {order}</button></div>
    {loading ? <div className={styles.emptyState}>Loading registrations...</div> : error ? <div className={styles.emptyState}><h3>Unable to load registrations</h3><p>{error}</p></div> : registrations.length === 0 ? <div className={styles.emptyState}><h3>No registrations found</h3><p>Registrations submitted through Events will appear here.</p></div> : <div className={styles.tableWrap}><table><thead><tr><th>Student</th><th>Event</th><th>College</th><th>Amount</th><th>Payment</th><th>Status</th><th>Actions</th></tr></thead><tbody>{registrations.map((item) => <tr key={item._id}><td>{item.fullName}<br /><small>{item.email}</small></td><td>{item.event?.title || 'Event unavailable'}</td><td>{item.college}</td><td>₹{item.paymentAmount}</td><td className={item.paymentStatus === 'paid' ? styles.paid : styles.pending}>{item.paymentStatus}</td><td><select value={item.status} disabled={actionId === item._id} onChange={(event) => handleStatusUpdate(item._id, event.target.value)}><option value="confirmed">confirmed</option><option value="waitlisted">waitlisted</option><option value="cancelled">cancelled</option></select></td><td><button type="button" disabled={actionId === item._id} onClick={() => handleDelete(item._id)}>Delete</button></td></tr>)}</tbody></table></div>}
    {!loading && !error && meta.pages > 1 && <div className={styles.pagination}><button type="button" disabled={meta.page <= 1} onClick={() => setMeta((current) => ({ ...current, page: current.page - 1 }))}>Previous</button><span>Page {meta.page} of {meta.pages}</span><button type="button" disabled={meta.page >= meta.pages} onClick={() => setMeta((current) => ({ ...current, page: current.page + 1 }))}>Next</button></div>}
  </section>
}
