"use client";
import React, { useState,useEffect } from 'react';
import styles from "./lead.module.css";
import Nav from '@/app/compnant/nav/page';
import Image from 'next/image';
import sort from "./images/sort.svg";
import Card from '@/app/compnant/card/page';
import Card2 from '@/app/compnant/card2/page';
import { useContext } from 'react';
import { Store } from '@/app/context/leadData/page';

const Lead = () => {
    const [dataUsers, setDataUsers] = useState([]);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userIdd, setUserIdd] = useState(null);
    useEffect(() => {
        // Retrieve user ID from localStorage
        const id = localStorage.getItem("userId");
        if (id) {
          setUserIdd(id);
        } else {
          console.error("User ID not found in localStorage");
        }
    
        // Fetch user data from API
        fetch("http://localhost:5000/api/users")
          .then((res) => res.json())
          .then((data) => {
            setDataUsers(data);
    
            // Find user by ID
            const user = data.find((u) => u._id === id);
            if (user) {
              setFirstName(user.first_name);
              setLastName(user.last_name);
            } else {
              console.error("User not found with the given ID");
            }
          })
          .catch((error) => console.log("Error fetching data:", error));
      }, []);

      const userName = `${firstName} ${lastName}`
    const statusOptions = [
        { label: "Done", value: "done" },
        { label: "Lost", value: "lost" },
        { label: "Delay", value: "delay" },
        { label: "call back", value: "callback" },
        { label: "No answer", value: "no answer" },
        { label: "Follow Up", value: "follow up" },
        { label: "All Leads", value: "all leads" },
    ];
    const { data: crmData, loading, error } = useContext(Store);

 console.log(crmData);
 

    const [search, setSearch] = useState("");
    const [selectLead, setSelectLead] = useState("all leads"); // Default to "All Leads"

    // Handle input change for search
    const handleInput = (e) => {
        const input = e.target.value;
  
        // Allow only numeric input
        if (/^\d*$/.test(input)) {
          setSearch(input);
        }
        };

    // Handle lead status selection
    const handleSelectLead = (e) => {
        setSelectLead(e.target.value);
    };
    const [selectedCard, setSelectedCard] = useState(null); // For tracking the clicked card

    const handleCardClick = (lead) => {
      setSelectedCard(lead);
  };
  const handleCloseCard = () => {
    setSelectedCard(null);
};

    // Filtering leads based on search and selected lead status
    const filteredLeads = crmData.filter((lead) => {
        return (
            (search === "" || lead.phoneNumber.toLowerCase().includes(search.toLowerCase())) &&
            (selectLead === "all leads" || lead.leadStatus.toLowerCase().includes(selectLead))
        );
    });

    return (
      <div className={styles.lead}>
          <Nav />
          {selectedCard ? (
                <div className={styles.continarc2}>
                    <Card2
                        key={selectedCard._id}
                        id={selectedCard._id} // Pass the id prop here
                        clientName={selectedCard.clientName}
                        leadStatus={selectedCard.leadStatus}
                        phone={selectedCard.phoneNumber}
                        whatsapp={selectedCard.whatsappNumber}
                        salesname={userName}
                        carModel={selectedCard.carModel}
                        service={selectedCard.services}
                        source={selectedCard.sources}
                        revenue={selectedCard.expectedRevenue}
                        date={selectedCard.date}
                        comment={selectedCard.comment || ""}
                        onClose={handleCloseCard}  // Close button functionality
                        
                    />
                </div>
            ) : (
                <>
                  <section className={styles.sec1}>
                      <div className={styles.filter}>
                          <input
                              type="number"
                              name="search"
                              id={styles.search}
                              placeholder="Search with Phone "
                              onChange={handleInput}
                          />
                          <Image src={sort} alt="icon" className={styles.sort} />
                          <h1 className={styles.h1}>Filter</h1>
                          <select
                              name="status"
                              id={styles.status}
                              value={selectLead}
                              onChange={handleSelectLead}
                          >
                              {statusOptions.map((option) => (
                                  <option key={option.value} value={option.value}>
                                      {option.label}
                                  </option>
                              ))}
                          </select>
                      </div>
                  </section>
                  <section className={styles.sec3}>
                      {filteredLeads.map((lead) => (
                          <Card
                              key={lead._id}
                              client_name={lead.clientName}
                              sales_name={userName}
                              sources={lead.sources}
                              services={lead.services}
                              car={lead.carModel}
                              leadStatus={lead.leadStatus}
                              onclick={() => handleCardClick(lead)}
                              
                          />
                      ))}
                  </section>
              </>
          )}
      </div>
  );
};

export default Lead;