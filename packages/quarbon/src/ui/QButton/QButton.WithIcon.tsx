import { MdMarkEmailRead } from 'react-icons/all'
import { QButton } from '@quarbon/ui'
import { CbEmail, CbPhoneFilled, CbSend } from '@quarbon/icons/cb'

export default function WithIcon() {
  return (
    <>
      <QButton label="On left" icon={<MdMarkEmailRead size={16} />} color="primary" />
      <QButton label="On right" icon={<MdMarkEmailRead size={16} />} color="secondary" iconAlign="right" />
      <QButton style={{ background: '#FF0080', color: 'white' }}>
        <i>
          <CbEmail />
        </i>
        On left and right
        <i>
          <CbSend />
        </i>
      </QButton>
      <QButton style={{ background: '#9c27b0', color: 'white' }}>
        <div className="col align-center">
          <i style={{ marginLeft: 0 }}>
            <CbPhoneFilled />
          </i>
          Stacked
        </div>
      </QButton>
      <QButton color="info">
        <div className="col align-center">
          Stacked
          <i style={{ marginLeft: 0 }}>
            <CbPhoneFilled />
          </i>
        </div>
      </QButton>
    </>
  )
}
