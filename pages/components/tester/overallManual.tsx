import { Fragment, useState } from 'react'
import { useToggle } from '../../hooks/useInput'

export const OverallManual = () => {
  const [colTab, tColTab, setColTab] = useToggle()
  const [products, setProducts] = useState<
    {
      id: number
      insurer: string
      product_group: string
      product: string
      opened_at: string
      closed_at: string
      payment_cycle: string
      payment_cnt: number
      premium: number
      coverages: {
        id: number
        name: string
        status: string
        volume: number
      }[]
    }[]
  >([])
  const [coverages, setCoverages] = useState<
    {
      id: number
      name: string
      status: string
      volume: number
    }[]
  >([])
  const [data, setData] = useState<{
    result: boolean
    data: {
      overall: {
        premium_features: {
          hasPureIncome: boolean
          income: number
          outcome: number
          age: number
          monthly_premium: number
          current_payment_ratio: number
          grade: string
          grade_desc: string
          std_premium: number
          std_min_ratio: number
          std_max_ratio: number
        }
        coverage_range_features: {
          own_cnt: number
          std_cnt: number
          matched_cnt: number
          matched_ratio: number
          over_cnt: number
          grade: string
          grade_desc: string
        }
        coverage_volume_features: {
          own_cnt: number
          std_cnt: number
          matched_cnt: number
          matched_ratio: number
          grade: string
          grade_desc: string
        }
        description: string
      }
    }
    msg: string | null
  } | null>(null)
  const makeRequest = (): string => {
    const doc = document as any
    let age = Number(doc.getElementById('age').value)
    let insurance_age = Number(doc.getElementById('insurance_age').value)
    let gender = Number(doc.getElementById('gender').value)
    let job_grade = Number(doc.getElementById('job_grade').value)
    let is_married = Number(doc.getElementById('is_married').value)
    let has_kid = Number(doc.getElementById('has_kid').value)
    let income = Number(doc.getElementById('income').value)
    let outcome = Number(doc.getElementById('outcome').value)
    let msa = Number(doc.getElementById('msa').value)
    let coca_rn = Number(doc.getElementById('coca_rn').value)
    let gaca_rn = Number(doc.getElementById('gaca_rn').value)
    let paca_rn = Number(doc.getElementById('paca_rn').value)
    let lica_rn = Number(doc.getElementById('lica_rn').value)
    let blca_rn = Number(doc.getElementById('blca_rn').value)
    let prca_rn = Number(doc.getElementById('prca_rn').value)
    let thca_rn = Number(doc.getElementById('thca_rn').value)
    let brca_rn = Number(doc.getElementById('brca_rn').value)
    let utca_rn = Number(doc.getElementById('utca_rn').value)
    let ovca_rn = Number(doc.getElementById('ovca_rn').value)
    let hert_rn = Number(doc.getElementById('hert_rn').value)
    let strk_rn = Number(doc.getElementById('strk_rn').value)
    let deia_rn = Number(doc.getElementById('deia_rn').value)
    return JSON.stringify({
      age,
      insurance_age,
      gender,
      job_grade,
      is_married,
      has_kid,
      income,
      outcome,
      health_info: {
        msa,
        coca_rn,
        gaca_rn,
        paca_rn,
        lica_rn,
        blca_rn,
        prca_rn,
        thca_rn,
        brca_rn,
        utca_rn,
        ovca_rn,
        hert_rn,
        strk_rn,
        deia_rn,
      },
      products,
    })
  }
  const fetchData = async () => {
    const res = await fetch('http://localhost:8080/v3/analysis', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        token: 'k/eA8dc8YjWdDZ+voVl64iJs52hRo1W4mILlOKuWlgs=',
      },
      body: makeRequest(),
    })
    const data = await res.json()
    setData(data)
  }
  const handleColTab = () => {
    setColTab(!colTab)
  }
  const handleAddCoverage = () => {
    const doc = document as any
    let id = 1
    let name = doc.getElementById('coverage_name').value
    let status = doc.getElementById('coverage_status').value
    let volume = Number(doc.getElementById('coverage_volume').value)
    if (coverages.length) {
      id = coverages.length + 1
    }
    setCoverages((coverages) => [...coverages, { id, name, status, volume }])
  }
  const handleRemoveCoverage = (id: number) => {
    setCoverages(coverages.filter((cov) => cov.id !== id))
  }
  const handleAddProduct = () => {
    const doc = document as any
    let id = 1
    if (products.length) {
      id = products.length + 1
    }
    let insurer = doc.getElementById('insurer').value
    let product_group = doc.getElementById('product_group').value
    let product = doc.getElementById('product').value
    let opened_at = doc.getElementById('opened_at').value
    let closed_at = doc.getElementById('closed_at').value
    let payment_cycle = doc.getElementById('payment_cycle').value
    let payment_cnt = Number(doc.getElementById('payment_cnt').value)
    let premium = Number(doc.getElementById('premium').value)
    setProducts((products) => [
      ...products,
      {
        id,
        insurer,
        product_group,
        product,
        opened_at,
        closed_at,
        payment_cycle,
        payment_cnt,
        premium,
        coverages,
      },
    ])
    setCoverages([])
  }
  const handleRemoveProduct = (id: number) => {
    setProducts(products.filter((prod) => prod.id !== id))
  }
  const handleAnalysisBtn = () => {
    fetchData()
  }
  return (
    <div className="flex flex-col px-4 py-4">
      <div className="flex flex-row">
        <div className="flex w-1/2 flex-col pr-4">
          <p className="pb-4 text-base dark:text-white">고객 정보</p>
          <div className="group relative z-0 mb-6 w-full">
            <input
              type="number"
              name="age"
              id="age"
              className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
              placeholder=" "
              required
            />
            <label
              htmlFor="age"
              className="transhtmlForm absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
            >
              나이
            </label>
          </div>
          <div className="group relative z-0 mb-6 w-full">
            <input
              type="number"
              name="insurance_age"
              id="insurance_age"
              className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
              placeholder=" "
              required
            />
            <label
              htmlFor="insurance_age"
              className="transhtmlForm absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
            >
              보험 나이
            </label>
          </div>
          <div className="group relative z-0 mb-6 w-full">
            <input
              type="number"
              name="gender"
              id="gender"
              className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
              placeholder=" "
              required
            />
            <label
              htmlFor="gender"
              className="transhtmlForm absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
            >
              성별 (남:1, 여:2)
            </label>
          </div>
          <div className="grid xl:grid-cols-2 xl:gap-6">
            <div className="group relative z-0 mb-6 w-full">
              <input
                type="number"
                name="job_grade"
                id="job_grade"
                className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                placeholder=" "
                required
              />
              <label
                htmlFor="job_grade"
                className="transhtmlForm absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
              >
                직업 등급 (비위험직:1, 중위험직:2, 고위험직:3)
              </label>
            </div>
            <div className="group relative z-0 mb-6 w-full">
              <input
                type="number"
                name="is_married"
                id="is_married"
                className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                placeholder=" "
                required
              />
              <label
                htmlFor="is_married"
                className="transhtmlForm absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
              >
                결혼 여부 (기혼:1, 미혼:0)
              </label>
            </div>
            <div className="group relative z-0 mb-6 w-full">
              <input
                type="number"
                name="has_kid"
                id="has_kid"
                className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                placeholder=" "
                required
              />
              <label
                htmlFor="has_kid"
                className="transhtmlForm absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
              >
                자녀 유무 (자녀있음:1, 자녀없음:0)
              </label>
            </div>
            <div className="group relative z-0 mb-6 w-full">
              <input
                type="number"
                name="income"
                id="income"
                className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                placeholder=" "
                required
              />
              <label
                htmlFor="income"
                className="transhtmlForm absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
              >
                월수입 (원 단위)
              </label>
            </div>
            <div className="group relative z-0 mb-6 w-full">
              <input
                type="number"
                name="outcome"
                id="outcome"
                className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                placeholder=" "
                required
              />
              <label
                htmlFor="outcome"
                className="transhtmlForm absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
              >
                월지출 (원 단위)
              </label>
            </div>
          </div>
        </div>
        <div className="flex w-1/2 flex-col">
          <p className="pb-4 text-base dark:text-white">건강 정보</p>
          <div className="group relative z-0 mb-6 w-full">
            <input
              type="number"
              id="msa"
              name="msa"
              className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
              placeholder=" "
              required
            />
            <label
              htmlFor="msa"
              className="transhtmlForm absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
            >
              대사 나이 (-15 ~ 15)
            </label>
          </div>
          <div className="group relative z-0 mb-6 w-full">
            <input
              type="number"
              name="coca_rn"
              id="coca_rn"
              className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
              placeholder=" "
              required
            />
            <label
              htmlFor="coca_rn"
              className="transhtmlForm absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
            >
              대장암 위험 등급 (1 ~ 5)
            </label>
          </div>
          <div className="group relative z-0 mb-6 w-full">
            <input
              type="number"
              name="gaca_rn"
              id="gaca_rn"
              className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
              placeholder=" "
              required
            />
            <label
              htmlFor="gaca_rn"
              className="transhtmlForm absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
            >
              위암 위험 등급 (1 ~ 5)
            </label>
          </div>
          <div className="grid xl:grid-cols-2 xl:gap-6">
            <div className="group relative z-0 mb-6 w-full">
              <input
                type="number"
                name="paca_rn"
                id="paca_rn"
                className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                placeholder=" "
                required
              />
              <label
                htmlFor="paca_rn"
                className="transhtmlForm absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
              >
                췌장암 위험 등급 (1 ~ 5)
              </label>
            </div>
            <div className="group relative z-0 mb-6 w-full">
              <input
                type="number"
                name="lica_rn"
                id="lica_rn"
                className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                placeholder=" "
                required
              />
              <label
                htmlFor="lica_rn"
                className="transhtmlForm absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
              >
                간암 위험 등급 (1 ~ 5)
              </label>
            </div>
            <div className="group relative z-0 mb-6 w-full">
              <input
                type="number"
                name="blca_rn"
                id="blca_rn"
                className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                placeholder=" "
                required
              />
              <label
                htmlFor="blca_rn"
                className="transhtmlForm absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
              >
                방광암 위험 등급 (1 ~ 5)
              </label>
            </div>
            <div className="group relative z-0 mb-6 w-full">
              <input
                type="number"
                name="prca_rn"
                id="prca_rn"
                className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                placeholder=" "
                required
              />
              <label
                htmlFor="prca_rn"
                className="transhtmlForm absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
              >
                전립선암 위험 등급 (1 ~ 5)
              </label>
            </div>
            <div className="group relative z-0 mb-6 w-full">
              <input
                type="number"
                name="thca_rn"
                id="thca_rn"
                className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                placeholder=" "
                required
              />
              <label
                htmlFor="thca_rn"
                className="transhtmlForm absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
              >
                갑상선암 위험 등급 (1 ~ 5)
              </label>
            </div>
            <div className="group relative z-0 mb-6 w-full">
              <input
                type="number"
                name="brca_rn"
                id="brca_rn"
                className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                placeholder=" "
                required
              />
              <label
                htmlFor="brca_rn"
                className="transhtmlForm absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
              >
                유방암 위험 등급 (1 ~ 5)
              </label>
            </div>
            <div className="group relative z-0 mb-6 w-full">
              <input
                type="number"
                name="utca_rn"
                id="utca_rn"
                className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                placeholder=" "
                required
              />
              <label
                htmlFor="utca_rn"
                className="transhtmlForm absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
              >
                자궁암 위험 등급 (1 ~ 5)
              </label>
            </div>
            <div className="group relative z-0 mb-6 w-full">
              <input
                type="number"
                name="ovca_rn"
                id="ovca_rn"
                className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                placeholder=" "
                required
              />
              <label
                htmlFor="ovca_rn"
                className="transhtmlForm absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
              >
                난소암 위험 등급 (1 ~ 5)
              </label>
            </div>
            <div className="group relative z-0 mb-6 w-full">
              <input
                type="number"
                name="hert_rn"
                id="hert_rn"
                className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                placeholder=" "
                required
              />
              <label
                htmlFor="hert_rn"
                className="transhtmlForm absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
              >
                2차성 질환 심장병 위험 등급 (1 ~ 5)
              </label>
            </div>
            <div className="group relative z-0 mb-6 w-full">
              <input
                type="number"
                name="strk_rn"
                id="strk_rn"
                className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                placeholder=" "
                required
              />
              <label
                htmlFor="strk_rn"
                className="transhtmlForm absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
              >
                2차성 질환 뇌졸증 위험 등급 (1 ~ 5)
              </label>
            </div>
            <div className="group relative z-0 mb-6 w-full">
              <input
                type="number"
                name="deia_rn"
                id="deia_rn"
                className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                placeholder=" "
                required
              />
              <label
                htmlFor="deia_rn"
                className="transhtmlForm absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
              >
                3차성 질환 치매 위험 등급 (1 ~ 5)
              </label>
            </div>
          </div>
        </div>
      </div>
      <hr className="h-4" />
      <div className="flex flex-row">
        <div className="flex w-1/2 flex-col pr-4">
          <p className="pb-4 text-base dark:text-white">상품 입력</p>
          <div className="group relative z-0 mb-6 w-full">
            <input
              type="text"
              name="insurer"
              id="insurer"
              className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
              placeholder=" "
              required
            />
            <label
              htmlFor="insurer"
              className="transhtmlForm absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
            >
              회사명
            </label>
          </div>
          <div className="group relative z-0 mb-6 w-full">
            <input
              type="text"
              name="product_group"
              id="product_group"
              className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
              placeholder=" "
              required
            />
            <label
              htmlFor="product_group"
              className="transhtmlForm absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
            >
              상품 그룹명
            </label>
          </div>
          <div className="group relative z-0 mb-6 w-full">
            <input
              type="text"
              name="product"
              id="product"
              className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
              placeholder=" "
              required
            />
            <label
              htmlFor="product"
              className="transhtmlForm absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
            >
              상품명
            </label>
          </div>
          <div className="group relative z-0 mb-6 w-full">
            <input
              type="text"
              name="opened_at"
              id="opened_at"
              className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
              placeholder=" "
              required
            />
            <label
              htmlFor="opened_at"
              className="transhtmlForm absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
            >
              상품 시작일 (YYYY-MM-DD)
            </label>
          </div>
          <div className="group relative z-0 mb-6 w-full">
            <input
              type="text"
              name="closed_at"
              id="closed_at"
              className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
              placeholder=" "
              required
            />
            <label
              htmlFor="closed_at"
              className="transhtmlForm absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
            >
              상품 종료일 (YYYY-MM-DD)
            </label>
          </div>
          <div className="group relative z-0 mb-6 w-full">
            <input
              type="text"
              name="payment_cycle"
              id="payment_cycle"
              className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
              placeholder=" "
              required
            />
            <label
              htmlFor="payment_cycle"
              className="transhtmlForm absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
            >
              납입 주기
              (1M:매월,2M:2개월납,3M:3개월,6M:6개월,1Y:연단위,99:일시납)
            </label>
          </div>
          <div className="group relative z-0 mb-6 w-full">
            <input
              type="number"
              name="payment_cnt"
              id="payment_cnt"
              className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
              placeholder=" "
              required
            />
            <label
              htmlFor="payment_cnt"
              className="transhtmlForm absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
            >
              납입 기간 (납입 주기 단위)
            </label>
          </div>
          <div className="group relative z-0 mb-6 w-full">
            <input
              type="number"
              name="premium"
              id="premium"
              className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
              placeholder=" "
              required
            />
            <label
              htmlFor="premium"
              className="transhtmlForm absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
            >
              납입 보험료 (원 단위)
            </label>
          </div>
        </div>
        <div className="flex w-1/2 flex-col pr-4">
          <button
            type="button"
            className="mb-2 rounded-lg bg-purple-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
            onClick={handleColTab}
          >
            {colTab ? '담보 입력 창 닫기' : '담보 입력 창 열기'}
          </button>
          {colTab && (
            <Fragment>
              <p className="pb-4 text-base dark:text-white">담보 입력</p>
              <div className="group relative z-0 mb-6 w-full">
                <input
                  type="text"
                  name="coverage_name"
                  id="coverage_name"
                  className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="coverage_name"
                  className="transhtmlForm absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
                >
                  담보 이름
                </label>
              </div>
              <div className="group relative z-0 mb-6 w-full">
                <input
                  type="text"
                  name="coverage_status"
                  id="coverage_status"
                  className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="coverage_status"
                  className="transhtmlForm absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
                >
                  담보 상태
                </label>
              </div>
              <div className="group relative z-0 mb-6 w-full">
                <input
                  type="number"
                  name="coverage_volume"
                  id="coverage_volume"
                  className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="coverage_volume"
                  className="transhtmlForm absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
                >
                  보장 금액 (원 단위)
                </label>
              </div>
              <button
                type="button"
                className="mb-2 rounded-lg bg-purple-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                onClick={handleAddCoverage}
              >
                {'담보 추가'}
              </button>
            </Fragment>
          )}
          <hr className="h-4" />
          <div className="flex flex-col overflow-auto pr-4">
            <p className="pb-4 text-base dark:text-white">담보 정보</p>
            {coverages.length ? (
              coverages.map((cov) => {
                return (
                  <Fragment key={cov.id}>
                    <p className="pb-1 text-sm dark:text-white">
                      담보 이름: {cov.name}
                    </p>
                    <p className="pb-1 text-sm dark:text-white">
                      담보 상태: {cov.status}
                    </p>
                    <p className="pb-1 text-sm dark:text-white">
                      보장 금액: {cov.volume}
                    </p>
                    <button
                      type="button"
                      className="mb-2 rounded-lg bg-purple-700 px-5 py-0.5 text-sm font-medium text-white hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                      onClick={() => handleRemoveCoverage(cov.id)}
                    >
                      {'담보 삭제'}
                    </button>
                    <hr className="pb-1" />
                  </Fragment>
                )
              })
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
      <button
        type="button"
        className="mb-2 rounded-lg bg-purple-700 py-2.5 text-sm font-medium text-white hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
        onClick={handleAddProduct}
      >
        {'상품 추가'}
      </button>
      <hr className="h-4" />
      <div className="flex flex-row">
        <div className="flex w-1/2 flex-col pr-4">
          <p className="pb-4 text-base dark:text-white">상품 정보</p>
          {products.length ? (
            products.map((prod) => {
              return (
                <Fragment key={prod.id}>
                  <p className="pb-1 text-sm dark:text-white">
                    회사명: {prod.insurer}
                  </p>
                  <p className="pb-1 text-sm dark:text-white">
                    상품 그룹명: {prod.product_group}
                  </p>
                  <p className="pb-1 text-sm dark:text-white">
                    상품명: {prod.product}
                  </p>
                  <p className="pb-1 text-sm dark:text-white">
                    상품 시작일: {prod.opened_at}
                  </p>
                  <p className="pb-1 text-sm dark:text-white">
                    상품 종료일: {prod.closed_at}
                  </p>
                  <p className="pb-1 text-sm dark:text-white">
                    납입 주기: {prod.payment_cycle}
                  </p>
                  <p className="pb-1 text-sm dark:text-white">
                    납입 기간: {prod.payment_cnt}
                  </p>
                  <p className="pb-1 text-sm dark:text-white">
                    보험료: {prod.premium}
                  </p>
                  <hr className="pb-1" />
                  {prod.coverages.length ? (
                    prod.coverages.map((cov) => {
                      return (
                        <Fragment key={cov.id}>
                          <p className="pb-1 text-sm dark:text-white">
                            담보 이름: {cov.name}
                          </p>
                          <p className="pb-1 text-sm dark:text-white">
                            담보 상태: {cov.status}
                          </p>
                          <p className="pb-1 text-sm dark:text-white">
                            보장 금액: {cov.volume}
                          </p>
                          <hr className="pb-1" />
                        </Fragment>
                      )
                    })
                  ) : (
                    <div></div>
                  )}
                  <button
                    type="button"
                    className="mb-2 rounded-lg bg-purple-700 px-5 py-0.5 text-sm font-medium text-white hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                    onClick={() => handleRemoveProduct(prod.id)}
                  >
                    {'상품 삭제'}
                  </button>
                  <hr className="pb-1" />
                </Fragment>
              )
            })
          ) : (
            <div></div>
          )}
        </div>
      </div>
      <button
        type="button"
        className="mb-2 rounded-lg bg-purple-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
        onClick={handleAnalysisBtn}
      >
        종합진단
      </button>
      <div className="flex flex-col">
        {data && data.result ? (
          <Fragment>
            <p className="pb-4 text-xl dark:text-white">진단 결과</p>
            <hr className="h-2" />
            <p className="pb-2 text-lg dark:text-white">종합 진단</p>
            <hr className="h-1" />
            <p className="pb-2 text-lg dark:text-white">월 납입 진단</p>
            <p className="pb-1 text-sm dark:text-white">
              순수입 여부: {data.data.overall.premium_features.hasPureIncome}
            </p>
            <p className="pb-1 text-sm dark:text-white">
              수입: {data.data.overall.premium_features.income}
            </p>
            <p className="pb-1 text-sm dark:text-white">
              지출: {data.data.overall.premium_features.outcome}
            </p>
            <p className="pb-1 text-sm dark:text-white">
              나이: {data.data.overall.premium_features.age}
            </p>
            <p className="pb-1 text-sm dark:text-white">
              월 납입 보험료:{' '}
              {data.data.overall.premium_features.monthly_premium}
            </p>
            <p className="pb-1 text-sm dark:text-white">
              월 보험료 납입 비율:{' '}
              {data.data.overall.premium_features.current_payment_ratio}
            </p>
            <p className="pb-1 text-sm dark:text-white">
              월 납입 등급: {data.data.overall.premium_features.grade}
            </p>
            <p className="pb-1 text-sm dark:text-white">
              적정 월납입 보험료:{' '}
              {data.data.overall.premium_features.std_premium}
            </p>
            <p className="pb-1 text-sm dark:text-white">
              적정 월납입 보험료 최소 비율:{' '}
              {data.data.overall.premium_features.std_min_ratio}
            </p>
            <p className="pb-1 text-sm dark:text-white">
              적정 월납입 보험료 최대 비율:{' '}
              {data.data.overall.premium_features.std_max_ratio}
            </p>
            <hr className="h-1" />
            <p className="pb-2 text-lg dark:text-white">보장 범위 진단</p>
            <p className="pb-1 text-sm dark:text-white">
              고객 보장 개수:{' '}
              {data.data.overall.coverage_range_features.own_cnt}
            </p>
            <p className="pb-1 text-sm dark:text-white">
              필수 보장 개수:{' '}
              {data.data.overall.coverage_range_features.std_cnt}
            </p>
            <p className="pb-1 text-sm dark:text-white">
              매칭된 보장 개수:{' '}
              {data.data.overall.coverage_range_features.matched_cnt}
            </p>
            <p className="pb-1 text-sm dark:text-white">
              매칭된 보장 비율:{' '}
              {data.data.overall.coverage_range_features.matched_ratio}
            </p>
            <p className="pb-1 text-sm dark:text-white">
              과잉 보장 개수:{' '}
              {data.data.overall.coverage_range_features.over_cnt}
            </p>
            <p className="pb-1 text-sm dark:text-white">
              보장 범위 등급: {data.data.overall.coverage_range_features.grade}
            </p>
            <hr className="h-1" />
            <p className="pb-2 text-lg dark:text-white">보장 금액 진단</p>
            <p className="pb-1 text-sm dark:text-white">
              고객 보장 개수:{' '}
              {data.data.overall.coverage_volume_features.own_cnt}
            </p>
            <p className="pb-1 text-sm dark:text-white">
              필수 보장 개수:{' '}
              {data.data.overall.coverage_volume_features.std_cnt}
            </p>
            <p className="pb-1 text-sm dark:text-white">
              매칭된 보장 개수:{' '}
              {data.data.overall.coverage_volume_features.matched_cnt}
            </p>
            <p className="pb-1 text-sm dark:text-white">
              매칭된 보장 비율:{' '}
              {data.data.overall.coverage_volume_features.matched_ratio}
            </p>
            <p className="pb-1 text-sm dark:text-white">
              보장 금액 등급: {data.data.overall.coverage_volume_features.grade}
            </p>
          </Fragment>
        ) : (
          <div>진단 실패 {data?.msg}</div>
        )}
      </div>
    </div>
  )
}
