import React, { useState } from 'react';
import { Form, InputNumber, Row, Col, Space, Button, Select } from 'antd';
import FileSaver from 'file-saver';
import Tabs from '@/components/Tabs';
import { uuid } from '@/utils/utils';
import { keyCodeOptions } from '../../const';
import ss from './index.scss';

function CFComponent() {
  const items = [
    { label: '自定义', value: 'custom' },
    { label: '预制', value: 'pre_made' },
  ];
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState([uuid(16, 16)]);
  const [current, setCurrent] = useState('custom');
  // tab change
  function onTableChange(value) {
    setCurrent(value);
  }
  // 增加键
  function handleAddKey() {
    setDataSource([...dataSource, uuid(16, 16)]);
  }
  // 删除键
  function handleDelKey(key) {
    setDataSource(dataSource.filter((item) => item !== key));
  }
  // 生成xml
  async function createXML() {
    const values = await form.validateFields();
    const { cycles, ...rest } = values;
    const dataMap = new Map();
    for (const key in rest) {
      if (rest[key]) {
        const [valueKey, valueId] = key.split('-');
        const mapValue = dataMap.get(valueId) || {};
        dataMap.set(valueId, { ...mapValue, [valueKey]: rest[key] });
      }
    }
    const keyCodeData = [...dataMap].map((item) => item[1]);
    let content = '';
    for (let i = 0; i < cycles; i += 1) {
      const template = createTemplate(keyCodeData);
      content = `${content}${template}`;
    }
    const newFile = `<?xml version="1.0" encoding="utf-8"?>
    <Macro xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
      <Name>加特林1</Name>
      <Guid>fb58c1c1-65a6-4606-9726-21b67c7f529a</Guid>
      <MacroEvents>${content}
      </MacroEvents>
      <IsFolder>false</IsFolder>
      <FolderGuid>00000000-0000-0000-0000-000000000000</FolderGuid>
    </Macro>
    `;
    const blod = new Blob([newFile], { type: 'text/plain;charset=utf-8' });
    FileSaver.saveAs(blod, '加特林.xml');
  }
  // 生成模板
  function createTemplate(data) {
    let template = ``;
    data.forEach((item) => {
      const { keyCode, minKey, maxKey, minPress, maxPress } = item || {};
      const delay = parseInt(Math.random() * (maxKey - minKey) + minKey);
      const interval = parseInt(Math.random() * (maxPress - minPress) + minPress);
      template = `${template}
      <MacroEvent>
        <Type>1</Type>
        <Delay>${delay}</Delay>
        <KeyEvent>
          <Makecode>${keyCode}</Makecode>
        </KeyEvent>
      </MacroEvent>
      <MacroEvent>
        <Type>1</Type>
        <Delay>${interval}</Delay>
        <KeyEvent>
          <Makecode>${keyCode}</Makecode>
          <State>1</State>
        </KeyEvent>
      </MacroEvent>`;
    });
    return template;
  }
  return (
    <div className={ss.root}>
      <Tabs items={items} onChange={onTableChange} />
      {current === 'custom' && (
        <div>
          <Space className={ss.actions} size={32}>
            <Button type="primary" onClick={createXML}>
              生成xml
            </Button>
            <Button onClick={handleAddKey}>增加键</Button>
          </Space>
          <div className={ss.form}>
            <Form form={form} labelCol={{ span: 12 }} requiredMark={false}>
              <Form.Item
                label="循环次数"
                name="cycles"
                initialValue={100}
                extra="生成多少组；例：输入100，则生成100组下列键位的随机组合"
              >
                <InputNumber />
              </Form.Item>
              {dataSource.map((key, index) => (
                <div className={ss.valueItem} key={key}>
                  <div className={ss.valueItemTitle}>键-{index + 1}</div>
                  <div>
                    <Form.Item label="间隔值区间（键与键）" style={{ marginBottom: 0 }}>
                      <Row gutter={[8, 0]} className={ss.row}>
                        <Col>
                          <Form.Item name={`minKey-${key}`} rules={[{ required: true, message: '请输入' }]}>
                            <InputNumber min={0} />
                          </Form.Item>
                        </Col>
                        <Col className={ss.divide}>至</Col>
                        <Col>
                          <Form.Item name={`maxKey-${key}`} rules={[{ required: true, message: '请输入' }]}>
                            <InputNumber min={0} />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Form.Item>
                    <Form.Item label="间隔值区间（按键按下-松开）" style={{ marginBottom: 0 }}>
                      <Row gutter={[8, 0]} className={ss.row}>
                        <Col>
                          <Form.Item name={`minPress-${key}`} rules={[{ required: true, message: '请输入' }]}>
                            <InputNumber min={0} />
                          </Form.Item>
                        </Col>
                        <Col className={ss.divide}>至</Col>
                        <Col>
                          <Form.Item name={`maxPress-${key}`} rules={[{ required: true, message: '请输入' }]}>
                            <InputNumber min={0} />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Form.Item>
                    <Form.Item label="键位" name={`keyCode-${key}`} rules={[{ required: true, message: '请选择' }]}>
                      <Select options={keyCodeOptions} style={{ width: '210px' }} />
                    </Form.Item>
                  </div>
                  {index !== 0 && (
                    <div className={ss.delete} onClick={() => handleDelKey(key)}>
                      x
                    </div>
                  )}
                </div>
              ))}
            </Form>
          </div>
        </div>
      )}
    </div>
  );
}

export default CFComponent;
