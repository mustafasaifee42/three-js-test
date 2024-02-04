/* eslint-disable @typescript-eslint/no-unused-vars */
import { Select } from "antd";
import { useState } from "react"

function Header(){
  const [age, setAge] = useState(10);
  return (
    <div style={{
      width: '20%',
      backgroundColor: '#fff',
      height: '100vh'
    }}>
      <div style={{
        padding: '1rem',
      }}>
        <h4>
          Box Properties
        </h4>
      <Select
        defaultValue="lucy"
        style={{ width: 120 }}
        options={[
          { value: 'jack', label: 'Jack' },
          { value: 'lucy', label: 'Lucy' },
          { value: 'Yiminghe', label: 'yiminghe' },
          { value: 'disabled', label: 'Disabled', disabled: true },
        ]}
      />
      </div>
    </div>
  )
}

export default Header