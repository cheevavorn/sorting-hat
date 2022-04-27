import { useEffect, useRef, useState } from 'react';
import { Row, Col, Typography, Space, Card, Input, Button, Avatar } from 'antd';
import { sortingHatSelector } from './SortingHatLogic';

import gryffindorLogo from './Gryffindor.png'
import hufflepuffLogo from './Hufflepuff.png'
import ravenclawLogo from './Ravenclaw.png'
import SlytherinLogo from './Slytherin.png'

import logo from './sorting-hat.png';

const { Title, Text } = Typography;

function App() {
  const sortingLimit = 50;
  const [name, setName] = useState("");
  const inputRef = useRef();
  const [results, setResults] = useState([]);
  const [announce, setAnnounce] = useState(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  function handleNameChange(e){
    let name = e.target.value || "";
    let trimedName = name.trim();
    setName(trimedName);
  }

  function sortingMe(){
    if(name.length === 0 && name === ""){
      alert("บอกชื่อเจ้ามา !!!")
      return;
    }

    if(results.length === sortingLimit){
      alert(`ข้าเสียใจด้วย ข้าคัดสรรได้เพียง ${sortingLimit} คนเท่านั้น`);
      return;
    }

    // ตรวจสอบชื่อซ้ำ
    const nameList = results.map(student => student.name);
    if(nameList.includes(name)){
      alert(`${name}, เจ้าจะมาคัดสรรอีกครั้งไม่ได้นะ !`);
      setName("");
      inputRef.current.focus();
      return;
    }

    // Sorting me
    const houseName = sortingHatSelector(results, sortingLimit);
    setResults(results => [...results, { id: results.length, name, house: houseName, sortingAt: new Date().toLocaleDateString('th-TH')}]);
    setAnnounce(`'${name}' เจ้าถูกคัดสรรไปอยู่บ้าน '${houseName}'`);
    setName("");
    inputRef.current.focus();
  }

  return (
    <Row justify='center'>
      <Col xs={24} sm={20} md={18} lg={14}>
        <Row justify='center'>
          <img src={logo} style={{ width: 270 }} alt="sorting-hat" /><br/>
        </Row>
        <Row justify='center'>
          <Title strong>หมวกคัดสรร</Title>
        </Row>
        <Row justify='center'>
          <Space direction="vertical" align="center">
            { !name && (results.length !== sortingLimit) ? <Title level={3}>บอกชื่อเจ้ามา !</Title> : ""}
            { name && (<>
                <Title level={4}>ชื่อของเจ้าคือ</Title>
                <Text level={3} type="success">`{name}`</Text>
              </>
              )
            }
            {
              announce && <div style={{margin: "1rem", padding: '1rem', backgroundColor: '#dedfe0', borderRadius: '1rem', border: '2px solid black'}}>
                {announce}            
              </div>
            }
            <br/>
            </Space>
        </Row>
        <Row justify='center'>
          <Col span={24}>
            <Input.Group>
              <Input style={{ width: 'calc(100% - 200px)', textAlign: 'center' }} 
                placeholder="บอกชื่อของเจ้ามา" 
                value={name} 
                onChange={handleNameChange} ref={inputRef} disabled={results.length === sortingLimit} />
              <Button onClick={sortingMe} type="primary" disabled={results.length === sortingLimit}>คัดสรรฉันสิ!</Button>
            </Input.Group>
          </Col>
        </Row>
        <br/>
        <Row justify='center'>
          <Card title="ผลการคัดสรร" size="small" style={{ width: '100%' }}>
            <Card.Grid style={{ width: '50%', height: '100%' }}>
            { 
              results.length === 0 ? 
              <>ยังไม่มีผลการคัดสรร</>
              :
              <ul>
                <Text strong>ข้าคัดสรรไปแล้ว {results.length} คน</Text>
                <ol>
                  <Avatar src={gryffindorLogo} />{' '}
                  <Text level={5}>Gryffindor:  {results.filter(student => student.house === "Gryffindor").length} คน</Text>
                </ol>
                <ol>
                  <Avatar src={hufflepuffLogo} />{' '}
                  <Text level={5}>Hufflepuff: {results.filter(student => student.house === "Hufflepuff").length} คน</Text>
                </ol>
                <ol>
                  <Avatar src={ravenclawLogo} />{' '}
                  <Text level={5}>Ravenclaw: {results.filter(student => student.house === "Ravenclaw").length} คน</Text>
                </ol>
                <ol>
                  <Avatar src={SlytherinLogo} />{' '}
                  <Text level={5}>Slytherin: {results.filter(student => student.house === "Slytherin").length} คน</Text>
                </ol>
              </ul>
            }
            </Card.Grid>
            <Card.Grid style={{ width: '50%', height: '100%' }}>
              {results.length === 0 ? <Text strong>มาเร็วเด็กๆ ข้าอยากคัดสรรแล้ววว</Text> : 
              <ul> 
                <Text strong>ประวัติการคัดเลือก (6 รายชื่อท้ายสุด)</Text>
                {
                  results.map(student => (
                  <li key={student.id}>{student.name} ได้อยู่บ้าน {student.house}</li>)).slice(results.length > 6 ? results.length - 6 : 0)
                }
              </ul>
              }
            </Card.Grid>
          </Card>
        </Row>
      </Col>
    </Row>
  );
}

export default App;