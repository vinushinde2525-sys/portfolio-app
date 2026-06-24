import { motion } from 'framer-motion'
export default function NeonButton({ children, variant='filled', href, onClick, type='button', disabled, download, className='', style={} }) {
  const cls = variant==='filled' ? 'btn-fire' : 'btn-ghost'
  const Tag = href ? 'a' : 'button'
  const props = href
    ? { href, download, target:href.startsWith('http')?'_blank':undefined, rel:'noreferrer' }
    : { type, onClick, disabled }
  return (
    <motion.div whileHover={{ scale:1.02 }} whileTap={{ scale:0.97 }} style={{ display:'inline-flex' }}>
      <Tag {...props} className={`${cls} ${className}`} style={{ opacity:disabled?0.5:1, cursor:disabled?'not-allowed':'pointer', ...style }}>
        {children}
      </Tag>
    </motion.div>
  )
}
