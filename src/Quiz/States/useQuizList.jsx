import { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import quiz from '../../quiz.xlsx';

const useQuizList = () => {

    const [ excel, setExcel ] = useState(null);
    const [ quizData, setQuizData ] = useState(null);

    useEffect(() => {
        fetch(quiz)
            .then(response => response.blob())
            .then(blob => setExcel(blob))
    }, []);

    useEffect(() => {
        if (excel) {
            excel.arrayBuffer().then(buffer => {
                const workbook = XLSX.read(buffer, { type : 'buffer' });
                const sheet = workbook.Sheets['Quiz'];

                let isNext = false;
                let row = 2;
                let quizList = [];

                do {
                    let quiz = sheet[`A${ row }`]?.w ?? null;

                    if (quiz) {
                        let answer1 = sheet[`B${ row }`]?.w ?? null;
                        let answer2 = sheet[`C${ row }`]?.w ?? null;
                        let answer3 = sheet[`D${ row }`]?.w ?? null;
                        let answer4 = sheet[`E${ row }`]?.w ?? null;

                        quizList.push({
                            quiz,
                            answer1,
                            answer2,
                            answer3,
                            answer4,
                        }); 
                    }
                    ++row;
                    
                    isNext = quiz !== null;

                } while(isNext);

                setQuizData(quizList.sort(()=> Math.random() - 0.5));
            })
        }
    }, [ excel ]);

    return quizData;
}

export default useQuizList;